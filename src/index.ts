import kiv from '@jswork/kiv';
import dateformat from 'dateformat';

interface GtcCommand {
  label: string;
  value: string;
  icon?: string;
}

interface GtcCommandRc {
  commands: GtcCommand[];
}

const DEFAULT_FORMAT = 'yyyy-mm-dd HH:MM:ss';
const DEFAULT_COMMANDS: GtcCommandRc = {
  commands: [
    { label: '发布到 beta 环境', value: 'beta' },
    { label: '发布到 staging 环境', value: 'staging' },
    { label: '发布到 production 环境', value: 'production' },
    { label: '仅 build 当前项目', value: 'build' },
    { label: '仅上传到 beta 环境', value: 'upload-beta' },
    { label: '仅上传到 staging 环境', value: 'upload-staging' },
    { label: '仅上传到 production 环境', value: 'upload-production' },
    { label: '仅更新 cache 的 node_modules', value: 'cache' },
  ] as GtcCommand[],
};

const STR2ICON = {
  '@beta': '🍏',
  '@staging': '🍊',
  '@production': '🍎',
  '@upload': '🚚',
  '@cache': '📦',
};

export default (inGtcRc, inValue: string) => {
  const items = inGtcRc.commands || DEFAULT_COMMANDS.commands;
  const cmd = items.find((c) => c.value === inValue);
  const action = `__@${cmd?.value}__`;
  const gtcMsg = cmd ? `${cmd.label} ${action}` : inValue;
  const message = gtcMsg + ' at ' + dateformat(null, DEFAULT_FORMAT);
  const icon = cmd?.icon || kiv(gtcMsg, STR2ICON);
  const cmds = [
    'git pull',
    'git add --all',
    `git commit -m "chore: ${icon} ${message}"`,
    'git push',
  ];

  return {
    icon,
    cmds,
  };
};
