import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Wrapper from '../../components/Wrapper';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';

const Games = ({ questions }) => {
  const data = {
    title: 'Games',
    header: 'Selected games and contests.',
    description: 'Selected games and contests.',
  };
  return (
    <Wrapper data={data}>
      <section className='flex flex-wrap'>
        <div key='createGame' className='pv2 pa2-ns w-100 w-50-ns'>
          <a href='/games/create' className='no-underline'>
            <div className='white br2 shadow-4 grow pa3 pa4-ns h-100 contact-card'>
              <h1 className='f4 mt0 fw7'>
                <span role='img' aria-label='User Submission'>
                  🗳
                </span>{' '}
                Want to create a game?
              </h1>
              <p>If it&apos;s good, we will add it to our weekly games.</p>
              <p>Sound good?</p>
              <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                Create Game<span className='pl1 sans-serif'>→</span>
              </span>
            </div>
          </a>
        </div>

        {questions
          .reverse()
          .sort((a, b) => {
            const aname = a.answer.length === 0;
            const bname = b.answer.length === 0;
            if (aname && !bname) {
              return -1;
            }
            if (!aname && bname) {
              return 1;
            }
            return 0;
          })
          .map((game, ind) => {
            const gameButtonText = !game.answer ? 'Play Game' : 'See Results';
            const activeLink = `/games/${game.slug}`;
            const cardClass = `white br2 shadow-4 pa3 pa4-ns h-100 grow ${game.class}`;
            return (
              <>
                <div
                  key={`work-${game.question}`}
                  className='pv2 pa2-ns w-100 w-50-ns'>
                  <Link href={activeLink}>
                    <a href={activeLink} className='no-underline white'>
                      <div className={cardClass}>
                        <h1 className='f4 mt0 fw7'>
                          <span role='img' aria-label={game.emoji_name}>
                            {game.emoji}
                          </span>{' '}
                          {`Game #${game.question}`}
                        </h1>
                        <p>{game.description}</p>
                        <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                          {gameButtonText}
                          <span className='pl1 sans-serif'>→</span>
                        </span>
                      </div>
                    </a>
                  </Link>
                </div>
                {ind === 15 && (
                  <div key='contact' className='pv2 pa2-ns w-100 w-50-ns'>
                    <Link href='/grammys'>
                      <a href='/grammys' className='no-underline'>
                        <div className='white br2 shadow-4 grow pa3 pa4-ns h-100 grammy'>
                          <h1 className='f4 mt0 fw7'>
                            <span role='img' aria-label='User Submission'>
                              🏆
                            </span>{' '}
                            2020 Grammy Awards
                          </h1>
                          <p>Check out our bets for the 62nd Grammy’s!</p>
                          <p>Click to enter and see who won </p>
                          <span className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b'>
                            View Results
                            <span className='pl1 sans-serif'>→</span>
                          </span>
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
              </>
            );
          })}
      </section>
    </Wrapper>
  );
};

Games.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}`;
  const res = await axios.get(`${apiURL}/api/questions`);
  const questions = res.data;
  return { questions: questions.filter((game) => game.gameType === 'game') };
};
Games.propTypes = {
  questions: PropTypes.array,
};

export default Games;
