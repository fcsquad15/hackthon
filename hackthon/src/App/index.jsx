import './styles.css'

import Header from '../components/Header'

import Index from '../routes';
// import { UserProvider } from '../../../../../../../Documents/Cubos/Projeto M5/front-integral-m05-desafio-t05/src/contexts/UserContexts';

export default function Main() {

  return (
    <>
      {/* <UserProvider> */}
      <main>
        <Header />
        <section className='contentPage'>
          <Index />
        </section>
      </main>
      {/* </UserProvider> */}
    </>
  );
}
