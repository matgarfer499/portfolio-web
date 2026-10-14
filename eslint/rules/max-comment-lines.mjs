// A comment is a /* */ block or a run of `//` lines on consecutive lines; each may span at most `max`.
const DEFAULT_MAX = 3;

/** @type {import("eslint").Rule.RuleModule} */
const rule = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Limit every comment to a few lines (docs/architecture.md § Comments).' },
    schema: [
      {
        type: 'object',
        properties: { max: { type: 'integer', minimum: 1 } },
        additionalProperties: false,
      },
    ],
    messages: {
      tooLong:
        'Comment spans {{lines}} lines (max {{max}}). Say it shorter, or move the detail to docs/.',
    },
  },
  create(context) {
    const max = context.options[0]?.max ?? DEFAULT_MAX;
    const source = context.sourceCode;

    return {
      Program() {
        const groups = [];
        for (const comment of source.getAllComments()) {
          const last = groups.at(-1)?.at(-1);
          const continuesRun =
            comment.type === 'Line' &&
            last?.type === 'Line' &&
            comment.loc.start.line === last.loc.end.line + 1 &&
            isOwnLine(source, comment) === isOwnLine(source, last);
          if (continuesRun) groups.at(-1).push(comment);
          else groups.push([comment]);
        }

        for (const group of groups) {
          const lines = group.at(-1).loc.end.line - group[0].loc.start.line + 1;
          if (lines > max) {
            context.report({
              loc: { start: group[0].loc.start, end: group.at(-1).loc.end },
              messageId: 'tooLong',
              data: { lines, max },
            });
          }
        }
      },
    };
  },
};

function isOwnLine(source, comment) {
  const before = source.lines[comment.loc.start.line - 1].slice(0, comment.loc.start.column);
  return before.trim() === '';
}

export default rule;
