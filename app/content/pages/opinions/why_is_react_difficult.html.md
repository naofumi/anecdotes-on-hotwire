---
title: Reactが難しい要因はJavaScript
layout: article
order: 005
published: true
---

## Reactの難しさはJavaScriptの習得にある --- react-requires-good-knowledge-of-javascript

「React 難しい」でインターネットを検索すると多数ヒットします。

1. JavaScriptをしっかり勉強しなければならない
2. コンポーネントの分け方がわからない
3. JSXに慣れるのが難しい
4. Reduxが難しい
5. ...

中でも**JavaScriptをしっかり勉強しなければならないというのがダントツで課題**のようです。

## そこまで言語って勉強が必要だったっけ？ --- do-you-really-need-to-learn-javascript-thoroughly

JavaScriptをしっかり勉強しなければならないのは、一見すると当たり前です。ReactはJavaScriptで書かれていますので、それが読み書きできなければならないのは当然に思えます。

しかし、私を含め、多くのRuby on Rails開発者はRubyから始めていません。Ruby on Railsで一通りウェブサイトが作れるぐらいになった後にRubyをしっかり学び直す人が多いのではないかと思います。**JavaScriptをしっかり勉強しないとReactが難しいというのは違和感があります。**

## ReactはJavaScriptのかなり難しい機能を使っている --- react-uses-difficult-javascript-features

* Reactでは高階関数を多用します
  * イベントハンドラを子コンポーネントに渡すとき、関数へのレファランスをpropsで渡します
  * `useState()`の返り値の２項目は（例えば`const [user, setUser] = useState(null)`の`setUser`）は関数へのレファランスを返します
  * `useEffect()`は高階関数で、中に記述するのはクロージャー（無名関数）です
* Reactはasync awaitやコールバック関数を多用します
  * サーバからデータを取得するために`fetch()`を多用しますので、async awaitもしくはPromiseが必要になります
  * SSRになってくるとasyncだらけになってきます。DBとの通信がasyncなのはもちろんですが、Next.js v15からはそれだけではなく、[ほぼすべてがasync](https://nextjs.org/blog/next-15-rc2#async-request-apis-breaking-change)になります。

これらはJavaScriptの入門書に言及されていないことすら珍しくないものです。あったとしても最後の方に言及されているものです。これに加えてReactのプロジェクトではTypeScriptがよく使われています。

## Hotwireは入門書レベルのJavaScriptで書ける

一方でHotwireはJavaScriptの入門書程度のJavaScriptで十分に書けます。これについては[別記事で掘り下げています](/opinions/hotwire_javascript_is_simple)。

## 最後に

Hotwireの方がシンプルで、Reactの方が複雑だと言っているのではありません。熟練者にとっては高度な機能を使っている方が簡単にプログラムが書けるのかもしれません。しかし入門者やウェブデザイナー等にとってはハードルが高いフレームワークと言って良いと思います。

