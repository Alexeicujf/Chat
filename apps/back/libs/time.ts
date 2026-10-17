export const timeToMs = (time: string): number => {
	const seconds = /^(\d+)([smhd])$/;
	const match = time.match(seconds);

	if (!match) {
		throw new Error('Invalid time format. Use a number followed by s, m, h, or d.');
	}

	const [, value, unit] = time.match(seconds) as RegExpMatchArray;
	const numValue = parseInt(value, 10);
	switch (unit) {
		case 's':
			return numValue * 1000;
		case 'm':
			return numValue * 60 * 1000;
		case 'h':
			return numValue * 60 * 60 * 1000;
		case 'd':
			return numValue * 24 * 60 * 60 * 1000;
		default:
			throw new Error('Invalid time unit. Use s, m, h, or d.');
	}
};
