import { styles } from '../constants/styles';
import React from 'react';
// import SignUpForm from '../components/SignUpForm';
import { withRouter } from 'next/router';
import Wrapper from '../components/layout/Wrapper';

const data = {
  description: 'Make money while putting your intuition on the line.',
  header: `The 🌎's first music betting platform.`,
};
const Home = () => (
  <div>
    <Wrapper data={data}>
      <section>
        <p className={`${styles.paragraph}`}>
          Welcome to{' '}
          <a
            href='/about'
            alt='Ableton Push 2'
            title='Ableton Push 2'
            className={`${styles.link}`}>
            Clouty
          </a>
          . Every week, we will host contests about the latest releases and
          predictions in the rap game.{' '}
        </p>
        <p className={`${styles.paragraph}`}>
          This is a chance for you and your friends to make money while putting
          your intuition on the line{' '}
          <span role='img' aria-label='Bulleye'>
            🎯‍
          </span>{' '}
          Every contestant will be notified on the results and you can earn cash
          or tokens to use on future games.
        </p>
        <p className={`${styles.paragraph}`}>
          These questions will be regarding releases and predictions and we will
          use data and announcements to determine each weeks winners.
          <span role='img' aria-label='Sparkles'>
            ✨
          </span>{' '}
        </p>
        <a
          href='/games'
          alt='Ableton Push 2'
          title='Ableton Push 2'
          className={`${styles.link}`}>
          Get Started
        </a>{' '}
      </section>
    </Wrapper>
  </div>
);

export default withRouter(Home);
