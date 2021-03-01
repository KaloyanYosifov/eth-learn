/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

const colors = [
    '#4e73df',
    '#1cc88a',
    '#36b9cc',
    '#f6c23e',
    '#e74a3b',
    '#858796',
    '#f8f9fc',
    '#5a5c69',
];
export default function useRandomColors() {
    const generateRandomColor = () => colors[Math.random() * colors.length];

    return {
        generateRandomColor,
    };
}
