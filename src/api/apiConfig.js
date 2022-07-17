const apiConfig={
    baseUrl: 'https://api.themoviedb.org/3/',
    apikey:'67a9587530e938f78f8a792674dc89fd',
    originalImage:(imgPath)=>`https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image:(imgPath)=>`https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;