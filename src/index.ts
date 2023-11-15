import kiv from '@jswork/kiv';
import dateformat from 'dateformat';
import semver from 'semver';

interface GtcCommand {
  label: string;
  value: string;
  name?: string;
  icon?: string;
}

interface GtcCommandRc {
  autoVersion?: boolean;
  strictCommit?: boolean;
  commands: GtcCommand[];
}

const DEFAULT_FORMAT = 'yyyy-mm-dd HH:MM:ss';
const EMOJI_RE = new RegExp(
  '[' +
    '\u{1F300}-\u{1F5FF}' +
    '\u{1F600}-\u{1F64F}' +
    '\u{1F680}-\u{1F6FF}' +
    '\u{1F700}-\u{1F77F}' +
    '\u{1F780}-\u{1F7FF}' +
    '\u{1F800}-\u{1F8FF}' +
    '\u{1F900}-\u{1F9FF}' +
    '\u{1FA00}-\u{1FA6F}' +
    '\u{2600}-\u{26FF}' +
    '\u{2700}-\u{27BF}' +
    ']',
  'gu'
);

const DEFAULT_COMMANDS: GtcCommandRc = {
  autoVersion: false,
  strictCommit: false,
  commands: [
    { label: '🍏 发布到 beta 环境', value: 'beta' },
    { label: '🍐 发布到 staging 环境', value: 'staging' },
    { label: '🍎 发布到 production 环境', value: 'production' },
    { label: '🍞 仅更新 cache 的 node_modules', value: 'cache' },
  ] as GtcCommand[],
};

const cleanEmoji = (inString: string) => inString.replace(EMOJI_RE, '').trim();
const STR2ICON = {
  '@beta': '🍏',
  '@staging': '🍊',
  '@production': '🍎',
  '@cache': '📦',
};

const nodeGtc = (inGtcRc, inValue: string) => {
  const items = inGtcRc.commands || DEFAULT_COMMANDS.commands;
  const cmd = items.find((c) => c.value === inValue);
  const action = `__@${cmd?.value}__`;
  const gtcMsg = cmd ? `${cmd.name || cmd.label} ${action}` : inValue;
  const message = cleanEmoji(gtcMsg) + ' at ' + dateformat(null, DEFAULT_FORMAT);
  const icon = cmd?.icon || kiv(gtcMsg, STR2ICON);
  const commitFile = inGtcRc.strictCommit ? 'package.json' : '.';
  const cmds = [
    'git pull --no-rebase',
    `git add ${commitFile}`,
    `git commit -m "chore: ${icon} ${message}"`,
    'git push',
  ];

  return {
    icon,
    cmds,
    message,
  };
};

class GtcVersion {
  static patch(inVer: string, inIdentifier = 'beta') {
    return semver.inc(inVer, 'prerelease', inIdentifier);
  }

  static release(inVer: string) {
    return semver.inc(inVer, 'patch');
  }
}

export { DEFAULT_COMMANDS, nodeGtc, GtcVersion };
