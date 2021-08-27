window.onload = () => {
  document.getElementById('start').onclick = () => {
    const canvas = document.querySelector('#canvas');
    monsterGame.init(canvas);
  };

  document.getElementById('reStart').onclick = () => {
    const canvas = document.querySelector('#canvas');
    monsterGame.setRestart(canvas);
  };
};
