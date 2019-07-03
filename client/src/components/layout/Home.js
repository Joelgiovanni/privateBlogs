import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import img1 from '../../images/img01.jpeg';
import img2 from '../../images/img02.jpeg';
import img3 from '../../images/img03.jpeg';
import img4 from '../../images/img04.jpeg';
import img5 from '../../images/img05.jpeg';
import img6 from '../../images/img06.jpeg';

class Home extends Component {
  render() {
    return (
      <div id='wrapper'>
        <div id='main'>
          <article className='post'>
            <header>
              <div className='title'>
                <h2>
                  <div>One blog a day</div>
                </h2>
                <p>Keeps the doctor away</p>
              </div>
              <div className='meta'>
                <time className='published'>Creative thinking</time>
              </div>
            </header>
            <a href='single.html' className='image featured'>
              <img src={img1} alt='Old pen' />
            </a>
            <p />
          </article>
        </div>

        <section id='sidebar'>
          <section id='intro'>
            <header>
              <h2>Private Blogs</h2>
              <p>
                The folllowing articles are evidence on why blogging/journaling
                are so important
              </p>
            </header>
          </section>

          <section>
            <ul className='posts'>
              <li>
                <article>
                  <header>
                    <h3>
                      <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href='https://detailed.com/50/'
                      >
                        The 50 best blogs in the world. Ranked algorithmically
                      </a>
                    </h3>
                    <time className='published'>Updated every 24 hours</time>
                  </header>
                  <div className='image'>
                    <img src={img6} alt='winners scores' />
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <header>
                    <h3>
                      <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href='https://www.apa.org/monitor/2014/06/blogging'
                      >
                        Blogging for mental health(Older, still worth reading)
                      </a>
                    </h3>
                    <time className='published'>June 01, 2014</time>
                  </header>
                  <div className='image'>
                    <img src={img5} alt='Man walking through field' />
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <header>
                    <h3>
                      <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href='https://www.dreamhost.com/blog/19-expert-blogging-tips-for-2019/'
                      >
                        19 Expert blogging tips for 2019
                      </a>
                    </h3>
                    <time className='published'>January 11, 2019</time>
                  </header>
                  <div className='image'>
                    <img src={img4} alt='blog img' />
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <header>
                    <h3>
                      <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href='https://bloggingbrute.com/beginning-blogging/should-you-start-a-blog-in-2019/'
                      >
                        Should you start a blog in 2019?
                      </a>
                    </h3>
                    <time className='published'>Janury 7, 2019</time>
                  </header>
                  <div className='image'>
                    <img src={img3} alt='Brown pencil and journal' />
                  </div>
                </article>
              </li>
              <li>
                <article>
                  <header>
                    <h3>
                      <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href='https://www.emarketinghacks.com/benefits-of-blogging/'
                      >
                        Benefits Of Blogging: 5 Reasons You Must Start A Blog
                        Now
                      </a>
                    </h3>
                    <time className='published'>April 12, 2019</time>
                  </header>
                  <div className='image'>
                    <img src={img2} alt='Computer and notepad' />
                  </div>
                </article>
              </li>
            </ul>
          </section>

          <section className='blurb'>
            <h2 className='text-center'>About</h2>
            <p className='text-center'>
              This is not a social media site. Nothing is for sale. Just a site
              where people can write whatever it is they feel and have it be
              completely private. Nobody will have access to anything you write.
              Think of it as a private journal you have access to from anywhere
              with wifi!
            </p>
            <ul className='actions '>
              <li className='mx-auto'>
                <Link to='/register' className='button'>
                  Get started
                </Link>
              </li>
            </ul>
          </section>

          <section id='footer'>
            <p className='copyright'>
              &copy; Joel Godoy 2019{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/Joelgiovanni'
                className='fab fa-github git-icon'
              >
                {' '}
              </a>
            </p>
          </section>
        </section>
      </div>
    );
  }
}

export default Home;
