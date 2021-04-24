import React, { useEffect, useState } from 'react';
import './Footer.css';
import treeLev from '../../../static/pics/icons/tree_lev.svg';
import treeTri from '../../../static/pics/icons/tree_tri.svg';

function Footer({ config }) {
  const [treeImgs, setTreeImgs] = useState([]);
  const [treesInterval, setTreesInterval] = useState();
  const initTreesImgs = () => {
    const imgs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 9; i++) {
      imgs.push(
        <img
          key={i}
          src={treeLev}
          className="h-32"
          alt="footer trees animation heart tree shape"
        />
      );
    }
    setTreeImgs(imgs);
  };
  function startTreeAnimation() {
    let i = 0;

    const intervalRef = setInterval(() => {
      i += 1;

      if (i === 9) {
        i = 0;
      }
      const modifiedTrees = [];
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < 9; j++) {
        modifiedTrees.push(
          <img
            key={j}
            src={j === i ? treeTri : treeLev}
            className="h-32"
            alt="footer trees animation triangle tree shape"
          />
        );
      }
      setTreeImgs(modifiedTrees);
    }, 350);
    setTreesInterval(intervalRef);
  }

  useEffect(() => {
    if (treesInterval) {
      clearInterval(treesInterval);
    }
    initTreesImgs();
    startTreeAnimation();

    return () => {
      clearInterval(treesInterval);
    };
  }, []);

  const { copyright } = config;

  return (
    <footer className="bg-gray">
      <div className="flex flex-col items-center mx-auto py-8 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center mb-10">{treeImgs}</div>
        {copyright ? (
          <p className="mt-8 text-center text-base text-gray-400">
            {copyright}
          </p>
        ) : null}
      </div>
    </footer>
  );
}

export default Footer;
