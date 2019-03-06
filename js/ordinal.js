// From https://gist.github.com/jakewtaylor/120eed6f0f49c098902c9d29628163c6
export const ordinal = n => ['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th';
