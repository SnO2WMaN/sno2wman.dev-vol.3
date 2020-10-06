import anime from 'animejs/lib/anime.es';
import {shuffle} from 'lodash';

(() => {
  const seed = Math.floor(Math.random() * 120);

  document
    .querySelectorAll('.socials-wrapper > .foreground')
    .forEach(($foreground, i) => {
      const direction = (i === 0 ? 1 : -1) * (seed % 2 === 0 ? 1 : -1);
      anime({
        targets: $foreground.querySelectorAll('.cover'),
        easing: (_, j, len) =>
          `cubicBezier(${[
            0.455 + (j / (len - 1)) * (1 - 0.455),
            0.03 + (j / (len - 1)) * (0 - 0.03),
            0.515 + (j / (len - 1)) * (0 - 0.515),
            0.955 + (j / (len - 1)) * (1 - 0.955),
          ].join(',')})`,
        duration: 750,
        translateX: (_, j) =>
          j % 2 === 0 ? [`${direction * 101}%`, `${direction * -101}%`] : 0,
        translateY: (_, j) =>
          j % 2 === 1 ? [`${direction * 101}%`, `${direction * -101}%`] : 0,
        complete() {
          $foreground.remove();
        },
      });
    });

  const $socials = document.querySelectorAll('.socials > li');
  shuffle(Array.from($socials)).forEach(($social, i, {length}) => {
    $social.style.zIndex = length - i;
    const timeline = anime.timeline();
    const direction = ['left', 'right', 'top', 'bottom'][(i + seed) % 4];
    $social.classList.add(direction);

    timeline
      .add(
        {
          targets: $social,
          easing: 'easeInOutQuint',
          duration: 750,
          scaleX: direction === 'left' || direction === 'right' ? [0, 1] : 1,
          scaleY: direction === 'top' || direction === 'bottom' ? [0, 1] : 1,
        },
        350 + (i / (length - 1)) ** 0.5 * 750,
      )
      .add(
        {
          targets: $social.querySelectorAll('.cover'),
          easing: [
            'easeOutCubic',
            'easeOutQuint',
            'easeOutExpo',
            'steps(8)',
            'steps(4)',
          ][Math.floor(Math.random() * 5)],
          duration: 250,
          delay: anime.stagger(100, {easing: 'easeOutCubic'}),
          scaleX: direction === 'left' || direction === 'right' ? [0, 1] : 1,
          scaleY: direction === 'top' || direction === 'bottom' ? [0, 1] : 1,
        },
        '-=250',
      )
      .add(
        {
          targets: $social.querySelector('img'),
          easing: 'easeInOutQuad',
          duration: 250,
          opacity: [0, 1],
          translateX: [
            `${
              (direction === 'left' ? -1 : direction === 'right' ? 1 : 0) * 50
            }%`,
            0,
          ],
          translateY: [
            `${
              (direction === 'top' ? -1 : direction === 'bottom' ? 1 : 0) * 50
            }%`,
            0,
          ],
        },
        '-=100',
      );
  });
})();
