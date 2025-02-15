import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import {
  IpcChannel,
  IUpdateInfo,
} from '../common/types'
import __ from '../locales'
import app from './app'

autoUpdater.logger = log
autoUpdater.autoDownload = false

autoUpdater.on('update-available', async (info: IUpdateInfo) => {
  log.info('update available', info.version, info.path)

  await app.ready

  const win = app.getMainWindow()
  win && win.webContents.send(IpcChannel.APP_UPDATE, info)
})

export default autoUpdater
