import { db } from '$lib/database/db';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaError } from '$lib/services/error';
export const getProjects = async () => {
	try {
		const projects = await db.project.findMany({ include: { section: true } });
		return projects;
	} catch (e) {
		console.error(e);
	}
};
export const getProject = async (id: string) => {
	try {
		const project = await db.project.findUnique({ where: { id }, include: { section: true } });
		return project;
	} catch (e) {
		console.error(e);
	}
};
export const createProject = async (data: any) => {
	const { section, ...projectData } = data;
	try {
		await db.project.create({
			data: {
				...projectData,
				...(section?.id && { section: { connect: { id: section.id } } })
			}
		});

		return { success: true };
	} catch (e) {
		console.error(e);
		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
export const updateProject = async (id: string, data: any) => {
	const { section, ...projectData } = data;

	try {
		await db.project.update({
			where: { id },
			data: {
				...projectData,
				section: section ? { connect: { id: section.id } } : { disconnect: true }
			}
		});

		return { success: true };
	} catch (e) {
		console.error(e);

		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
