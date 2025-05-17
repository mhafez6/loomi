'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { authClient } from '@/lib/auth-cleint'

const Page = () => {
  const handleSignIn = async () => {
    return await authClient.signIn.social({provider: 'google'})
  }
  return (
    <main className='sign-in'>
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="SnapChat Logo"
            width={32}
            height={32}
          />
          <h1>Loomi</h1>
        </Link>

        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="Star Icon"
                  width={20}
                  height={20}
                  key={index}
                />
              ))}
            </figure>
            <p>
            Loomi allows me to focus on the better things in life <span >(watching Lebron)</span>
            </p>
            <article>
              <Image
                src="/assets/images/jason.png"
                alt="Jason"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2>Monkey D. Luffy ? </h2>
                <p>Random guy, probably an unemployed cs major</p>
              </div>
            </article>
          </section>
        </div>
        <p>© Loomi 2025</p>
      </aside>
      <aside className='google-sign-in'>
          <section>
          <Link href="/">
            <Image src="/assets/icons/logo.svg" width={40} height={40} alt='logo'/>
          </Link>
          <p>Create and share videos on <span>loomi</span> with a click of a button</p>
          <button onClick={handleSignIn}>
            <Image src="/assets/icons/google.svg" alt='google' width={22} height={22} />
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className='overlay' />
    </main>
  )
}

export default Page