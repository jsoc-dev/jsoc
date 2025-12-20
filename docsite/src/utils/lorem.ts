import { range } from "@jsoc/core/utils";

const line =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia accusamus, reprehenderit, nobis itaque dolorem fugit ipsa vel minima natus enim quis nesciunt. Fugiat, sed? Iure ex quam suscipit est temporibus?';

function shuffle<T>(arr: T[]) {
	return [...arr].sort(() => Math.random() - 0.5);
}

export function getSampleLines(count: number) {
	if (count === 1) return line;

	const words = line.split(' ');

	return range(1, count)
		.map(() =>
			shuffle(words)
				.slice(0, Math.floor(Math.random() * words.length) + 3)
				.join(' ')
		)
		.join('\n');
}
