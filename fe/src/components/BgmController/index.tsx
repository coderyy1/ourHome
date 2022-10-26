import { useEffect, useState, useRef, useMemo } from 'react';
import styles from './style.less';

const muted = require('@/assets/bgmCont/muted.png');
const notMuted = require('@/assets/bgmCont/not-muted.png');

// 加载音乐资源
import { BgmList } from './constants';

// 数组量
const LISTLENGTH = BgmList?.length || 0;

// 是否播放
let playFlag = false;

const BgmController: React.FC = () => {
  const audioEl: any = useRef(null);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // 监听点击事件 -> 自动播放bgm
  const clickListener = () => {
    if (!playFlag) {
      audioEl.current.volume = 0.2;
      audioEl.current.play && audioEl.current.play();
      playFlag = true;
    }
  }

  // 自动下一首、循环
  const changeMusic = async () => {
    console.log('进入方法');
    // 最后一个 ？ 第一首 : 下一首
    let index = curIndex + 1 === LISTLENGTH ? 0 : curIndex + 1;
    console.log('index: --  ', index);
    await setCurIndex(index);
    console.log('state: --  ', curIndex);
    audioEl.current.src = BgmList[index]?.src;
    console.log('bgm: --  ', BgmList[index]?.src);
    audioEl.current.load && audioEl.current.load();
  }

  // 监听加载成功直接播放
  const playAfterLoad = () => {
    if (!playFlag) {
      // 未播放直接返回
      return;
    }
    audioEl.current.play && audioEl.current.play();
  }

  // 静音、恢复
  const toggleMuted = () => {
    setIsMuted(!audioEl.current.muted);
    audioEl.current.muted = !audioEl.current.muted;
  }

  useEffect(() => {
    document.body.addEventListener('click', clickListener);
    audioEl.current.addEventListener('ended', changeMusic);
    audioEl.current.addEventListener('canplay', playAfterLoad);

    return (() => {
      document.body.removeEventListener('click', clickListener);
      audioEl.current.removeEventListener('ended', changeMusic);
      audioEl.current.removeEventListener('canplay', playAfterLoad);
    });
  }, [curIndex]);

  return (
    <div className={styles.comp}>
      <div className={styles.nowText}>正在播放：</div>
      <div className={styles.musicName}>{BgmList[curIndex]?.name || '暂无'}</div>
      <div className={styles.mutedBtn} onClick={toggleMuted}>
        <img src={isMuted ? muted : notMuted} alt="" />
      </div>
      <audio ref={audioEl} src={BgmList[curIndex]?.src}></audio>
    </div>
  );
};

export default BgmController;