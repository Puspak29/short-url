import type { User } from "./Types/ResponseDataTypes";

// const user = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     plan: "pro"
// }

const user: User | null = null;

// const linkValues = [
//     { id: 1, original: 'https://linear.app/docs/keyboard-shortcuts', slug: 'linear-kb', clicks: 432, date: 'Mar 12, 2024', status: 'active' },
//     { id: 2, original: 'https://stripe.com/docs/api', slug: 'stripe-api', clicks: 1205, date: 'Mar 10, 2024', status: 'active' },
//     { id: 3, original: 'https://github.com/features/actions', slug: 'gh-actions', clicks: 890, date: 'Mar 09, 2024', status: 'active' },
//     { id: 4, original: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', slug: 'mdn-js', clicks: 1543, date: 'Mar 08, 2024', status: 'active' },
//     { id: 5, original: 'https://react.dev/learn', slug: 'react-learn', clicks: 978, date: 'Mar 07, 2024', status: 'active' },
//     { id: 6, original: 'https://vitejs.dev/guide/', slug: 'vite-guide', clicks: 643, date: 'Mar 06, 2024', status: 'inactive' },
//     { id: 7, original: 'https://nextjs.org/docs', slug: 'next-docs', clicks: 1120, date: 'Mar 05, 2024', status: 'active' },
//     { id: 8, original: 'https://tailwindcss.com/docs', slug: 'tailwind-docs', clicks: 1345, date: 'Mar 04, 2024', status: 'active' },
//     { id: 9, original: 'https://nodejs.org/en/docs', slug: 'node-docs', clicks: 876, date: 'Mar 03, 2024', status: 'active' },
//     { id: 10, original: 'https://expressjs.com/en/guide/routing.html', slug: 'express-routing', clicks: 512, date: 'Mar 02, 2024', status: 'inactive' },
//     { id: 11, original: 'https://firebase.google.com/docs', slug: 'firebase-docs', clicks: 1670, date: 'Mar 01, 2024', status: 'active' },
//     { id: 12, original: 'https://supabase.com/docs', slug: 'supabase-docs', clicks: 729, date: 'Feb 28, 2024', status: 'active' },
//     { id: 13, original: 'https://aws.amazon.com/documentation/', slug: 'aws-docs', clicks: 1985, date: 'Feb 27, 2024', status: 'active' },
//     { id: 14, original: 'https://www.typescriptlang.org/docs/', slug: 'ts-docs', clicks: 1422, date: 'Feb 26, 2024', status: 'active' },
//     { id: 15, original: 'https://www.docker.com/resources/what-container', slug: 'docker-intro', clicks: 608, date: 'Feb 25, 2024', status: 'inactive' },
//     { id: 16, original: 'https://kubernetes.io/docs/home/', slug: 'k8s-docs', clicks: 955, date: 'Feb 24, 2024', status: 'active' },
//     { id: 17, original: 'https://graphql.org/learn/', slug: 'graphql-learn', clicks: 801, date: 'Feb 23, 2024', status: 'active' },
// ];

const linkValues: { id: number; original: string; slug: string; clicks: number; date: string; status: string }[] = [];

export {
    user,
    linkValues
}