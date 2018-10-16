import React from 'react'
import Player from './view'
import { connect } from 'unistore/react'
import { getPlayer, getCache, getDownloads } from '../../unistore/selectors';

mapUnistoreToProps = (state) => ({
  player: getPlayer(state),
  cache: getCache(state),
  downloads: getDownloads(state)
});

export default connect(
  'player, cache, downloads',
  {
    togglePlay: 'triggerTogglePlay',
    updateStreamInfo: 'updateStreamInfo',
    updatePlayerStatus: 'updatePlayerStatus',
  }
)(Player)
