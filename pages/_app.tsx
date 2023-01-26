//styles import
import '@/styles/globals.css'

//library imports
import type { AppProps } from 'next/app'
import { useRef } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


function App({ Component, pageProps }: AppProps) {
  //To ensure data is not shared between uses and requests, useRef is used.
  const queryClient = useRef(new QueryClient({
    //Setting to not max out 500 free api calls per day as,
    //if user leave app,
    //React Query automatically requests fresh data for you in the background
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient.current}>
      {/* Hydrate component places query into cache on the server,
       then grab this cache and send it using dehydratedState prop*/}
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      {/* React Query Dev tools,
      will only show in production but commented out just in case */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App;