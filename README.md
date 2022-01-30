# react-carousel

Un carousel minimaliste utilisant l'insersection observer.

React + hooks + typescript


This sample needs the fontawesome library.

Add following link into the index.html file: 
```
  <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      crossorigin="anonymous"
    />
```


# usage

 ```
      ...

          <Carousel
            className={Style.Carousel}
            itemClassName={Style.ItemClassName}
            intersectionObserverThreshold={0.90}
            intersectionObserverMargin="10%"
          >
            {articles.map((article, index) => {
              return <CardArticle key={article.id} article={article} />;
            })}
          </Carousel>
      ...

 ```