import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');
	return {
		pageTitle: 'Admin | Sections Item Edit'
	};
};
