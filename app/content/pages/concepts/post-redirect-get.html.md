---
title: POST/Redirect/GETパターンと高速化
layout: article
order: 60
published: true
---

![post-redirect-get.webp](content_images/post-redirect-get.webp "w-full")

## ウェブアプリの定石パターン：POST/Redirect/GET

### POST/Redirect/GET（PRGパターン）とは

[POST/Redirect/GET](https://en.wikipedia.org/wiki/Post/Redirect/Get)はウェブで`<form>`を送信する際の定石パターンです。[日本語のPRGパターンの解説としてはここ](https://poco-tech.com/posts/spring-boot-introduction/post-redirect-get-pattern/)が良いと思います。

* Next.jsもRemixも、内部処理には多少の違いはあるものの、POST/Redirect/GETのパターンを使います
* HotwireはTurbo Drive, Turbo FramesではPOST/Redirect/GETのパターンを強制されます
* POST/Redirect/GETパターンはリンク先で解説している通り、ブラウザおのリロードによる多重送信を防いでくれますので、古くから定石的な扱いでした。特に多重送信は電子商取引などでは多重発注につながりますので、可能な限り回避しました（とは言いつつ、ちゃんとやっていないサイトも実はそこそこあります）
* SPAでは`<form>`を使った際に多重送信が発生してしまう問題に注意する必要が技術的には無くなったいます（SPAでリロードすると、ブラウザのステートが吹っ飛ぶだけであり、ユーザにとっては不便ですが、多重送信そのものは発生しません）
* Hotwire Turbo Drive, Next.jsやRemixの大文字`<Link>`タグのように、SPAとSSRを組み合わせた技術の場合は、SPAと同様に多重送信の問題は発生しません。したがって技術的にはPOST/Redirect/GETパターンを使う必要はないのですが、現実には`<form>`送信後はリダイレクトやリフレッシュを行い、実質的にPOST/Redirect/GETをすることが多いです

### POST/Redirect/GETの欠点

古くから普及し、モダンなウェブ技術でも使われ続けているPOST/Redirect/GETですが、欠点もあります

* POST/Redirect/GETは２往復のサーバ通信が必要になるので、単純に遅延が倍になります
    * Next.jsのServer Actionでは、開発者はPOST/Redirect/GETを書いても実際にはサーバ通信が１往復しなしない仕掛けを用意しています
* Hotwireの場合、POSTの`<form>`送信で２往復を避け、遅延を最小化して１往復で処理をさせたい場合はTurbo Streamを使います
   * Turbo Drive, Turbo Framesともに[POST/Redirect/GETを前提とした動作をする](https://turbo.hotwired.dev/handbook/drive#redirecting-after-a-form-submission)ためです
      * 具体的には、フォーム送信後は必ずRedirectを期待し(ステータス300系)、バリデーションエラーでは必ずステータス400系を期待し、それに応じてブラウザ側でレスポンスを適宜処理します
      * フォーム送信後にリダイレクトなしで200系を返すと、レスポンスは無視されます
   * Turbo Streamsの場合は、Turbo Streamsの中身がブラウザの応答を規定します。ステータス番号に関わらず、自由です。サーバ側から自在にブラウザの画面を更新できます 

## 私のオススメ

HotwireとRailsの大きな特徴は、あまりUI/UXの細かいことに拘らない場合、非常に高速にCRUD画面が作れることです。画面がたくさん必要な案件ならば、Turbo DriveやTurbo Framesを使って、どんどんCRUD画面をたくさん作っていくのが良いでしょう。Turbo Framesすら不要で、MPA的な画面遷移で十分、いやむしろMPA的な画面遷移の方が良いことも多々あります。

**ここはUI/UXにこだわりたい**という画面についてはTurbo Streamsで処理し、レスポンス遅延の最小化を含めて最適化をすれば良いでしょう。サーバ側からはどんなリクエストに対しても、いつでもTurbo Streamsで応答できますので、大きな変更をせずにTurbo Streamsにアップグレードすることは容易です。
