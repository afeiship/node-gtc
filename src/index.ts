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
  commands: GtcCommand[];
}

const DEFAULT_FORMAT = 'yyyy-mm-dd HH:MM:ss';
const EMOJI_RE = /\p{Emoji}/gu;
const DEFAULT_COMMANDS: GtcCommandRc = {
  autoVersion: false,
  commands: [
    { label: '🍏 发布到 beta 环境', value: 'beta' },
    { label: '🍐 发布到 staging 环境', value: 'staging' },
    { label: '🍎 发布到 production 环境', value: 'production' },
    { label: '🍞 仅更新 cache 的 node_modules', value: 'cache' },
    { label: '仅 build 当前项目', value: 'build' },
    { label: '仅上传到 beta 环境', value: 'upload-beta' },
    { label: '仅上传到 staging 环境', value: 'upload-staging' },
    { label: '仅上传到 production 环境', value: 'upload-production' },
  ] as GtcCommand[],
};

const cleanEmoji = (inString: string) => inString.replace(EMOJI_RE, '').trim();
const STR2ICON = {
  '@beta': '🍏',
  '@staging': '🍊',
  '@production': '🍎',
  '@upload': '🚚',
  '@cache': '📦',
};

const nodeGtc = (inGtcRc, inValue: string) => {
  const items = inGtcRc.commands || DEFAULT_COMMANDS.commands;
  const cmd = items.find((c) => c.value === inValue);
  const action = `__@${cmd?.value}__`;
  const gtcMsg = cmd ? `${cmd.name || cmd.label} ${action}` : inValue;
  const message = cleanEmoji(gtcMsg) + ' at ' + dateformat(null, DEFAULT_FORMAT);
  const icon = cmd?.icon || kiv(gtcMsg, STR2ICON);
  const cmds = [
    'git pull --no-rebase',
    'git add --all',
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
