const blockChanger = (visible, notVisible) => {
        const visibleBlock = document.querySelector(visible),
          notVisibleBlock = document.querySelector(notVisible);

        visibleBlock.classList.add('hide');
        notVisibleBlock.classList.remove('hide');
};

export default blockChanger;
