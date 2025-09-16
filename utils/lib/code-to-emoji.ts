export const codepointsToEmoji = (code: string) =>
    String.fromCodePoint(...code.split("-").map((c) => parseInt(c, 16)));