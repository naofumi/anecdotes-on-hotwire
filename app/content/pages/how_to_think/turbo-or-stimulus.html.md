---
title: "TurboとStimulus: どっちを使う？"
section: Tips
layout: article
order: 020
published: true
---

## Hotwireはいろんな技術から構成されている --- hotwire-composition

Hotwireは大きくTurbo, Stimulus, Nativeの技術から構成されています。そしてTurboはさらにTurbo Drive, Turbo Frames, Turbo Streamsに分かれています。[Native](https://native.hotwired.dev)はモバイルアプリを作るためのツールなので使い分けが明確です。一方でTurboとStimulusのそれぞれの役割と使い分け方は迷うかもしれません。

ここでは TurboとStimulus の使い分けについて解説します。

![hotwire-component-structure.webp](content_images/hotwire-component-structure.webp)


## そもそもインタラクティブなUIの仕組みは？ --- how-do-interactive-sites-work

明確な定義はありませんが、インタラクティブなUIは一般的に以下の動作をするものと言えます。

1. ユーザが何らかの操作をします。キーの入力、ボタンのクリック、ドラッグドロップなどが想定されます
2. ページ遷移をするのではなく、（少なくとも見かけ上は）同じページで応答が表示されます
   1. Google Mapsであれば、別の地点の地図が表示されます
   2. モーダルダイアログが表示される、メニューが降りてくる、サイドパネルに情報が表示されるなどが考えられます
   3. データがサーバ上にあるの場合は、ここでサーバへのリクエスト送信とレスポンスの受信を行います

## TurboとStimulusによるインタラクティブなUI --- interactive-ui-with-turbo-and-stimulus

![interactive-flow-hotwire.webp](content_images/interactive-flow-hotwire.webp)

* 一番上の**黒の箇所**は、ブラウザがネイティブに持っているインタラクティブUIの流れです。例えばチェックボックスをクリックするとチェックが入るものだとか、テキストフィールドにフォーカスした時にキーを押すと、対応する文字が表示されるとかです。イベントを受け取るところから画面に反映するところまで、ブラウザがネイティブに処理してくれます
* 二番目の<span class="text-green-600">**緑の箇所**</span>はStimulusを使用しています。Stimulusはブラウザのイベント処理を整理し、再利用可能にする仕組みです。ブラウザのネイティブな処理とは異なるものを実施したいときにStimulusを使います。ここではStimuls Controllerが`action`でイベントをハンドルし、さらに画面の`target`で指定した箇所を更新します
* 三番目の<span class="text-blue-600">**青の箇所**</span>はTurboを使用したものです。ここからはサーバにリクエストを送信して、レスポンスを処理するタイプのインタラクティブUIの話になります。Turboは`<a>`タグの`click`イベント、`<form>`タグの`submit`イベントなど、ブラウザのネイティブなイベントを真似、これらのイベントを自動的に処理します。サーバからレスポンスを受けると、Turbo Drive, Turbo Frames, Turbo Streamsのそれぞれ決まった方法に従って、レスポンス内容を画面に反映します。Turbo Driveの場合は画面遷移、Turbo Framesの場合は画面の一箇所の部分置換、Turbo Streamsの場合はレスポンス次第で複数箇所の部分置換や部分追加、削除を行います
* 四番目の箇所は、StimulusとTurboを複合的に使ったものになります。
  * `<a>`タグの`click`イベント、`<form>`タグの`submit`イベント**以外の**イベントを処理したい場合は、Stimulusでイベントをハンドルして、サーバにTurboのリクエストを送信します。例えばライブ検索であれば`<input>`タグの`input`イベントに反応したり、キーボードショートカットであれば`keydown`イベントに反応できるようになります。Turboのリクエストを送信することで、上述したTurbo Drive, Turbo Frames, Turbo Streamsによる自動処理が行われます。
  * Turboのリクエストを受信しると、上述したTurbo Drive, Turbo Frames, Turbo Streamsによる自動処理が行われます。これをカスタマイズしたい場合は、Turbo送受信時にカスタムイベントが発火しますので、これを受け取って処理します。一般にイベントはStimulus Controllerで拾うのが便利でしょう。例えばモーダルダイアログ中の`<form>`からPOSTのリクエストを受取、成功した場合にモーダルダイアログを自動的に閉じるなどの処理が可能になります。

このように、Hotwireではブラウザネイティブ、Stimulus、Turboのイベント処理を組み合わせて、望み通りのUI/UXを実現します。サーバとの通信が不要な場合はStimulusだけで処理し、サーバとの通信が必要な場合は主にTurboを使いながら、補佐的にStimulusを使います。

## （参考）ReactによるインタラクティブなUI --- interactive-ui-with-react

上記ではモーダルダイアログのUIを想定しています。そしてモーダルの中身はサーバから取得するものとします。

![interactive-flow-react.webp](content_images/interactive-flow-react.webp)


* Reactの大きな特徴はステートです。必ずステートを更新してから、それの結果として画面が更新されるようにします
    * イベントハンドラはまずステートを更新します。ステートを更新すると自動的に再レンダリングして、画面が更新されます
    * 画面の更新をした結果、新しいモーダルダイアログコンポーネントが表示されます
    * モーダルダイアログコンポーネントの中の`useEffect()`が起動し、`fetch()`でサーバにリクエストを送信します
    * レスポンスを受信したら、受信内容をモーダルダイアログのステートにセットします。ステートが更新されましたので、自動的にモーダルダイアログの部分の画面が更新されます

このようにReactでは必ず最初にステートを更新し、ステートから自動的に画面を更新します。インタラクティブUIの流れを敢えて一種類に絞っています。一種類しかないのでわかりやすい反面、自動処理をしてくれる箇所がなく、すべてカスタムで用意することになります。

## サーバ通信が必要かどうかの判断は意外に難しい --- do-you-need-server-communication

上述のように、Turboはサーバとの通信が必要な時だけに使用します。ブラウザがすでに持っているデータだけで完了する場合はTurboは不要で、Stimulusだけで十分です。しかしこの判断は意外と単純ではありません。下記のことを考慮して最終判断をする必要があります。

* **サーバからの最新情報が必要か？:** サーバから常に最新の情報が欲しいのであれば、Turboを使ってサーバと通信するしかありません。逆に、例えばプロフィール情報であればユーザ自身しか変更する人はいませんので、必ずしも最新である必要はありません（自ら更新したとき以来の最新であれば十分です）。その場合はStimulusで十分です
* **HTMLは更新するか？:** Stimulusで大きくHTMLを書き換えるのは一般的に避けます。CSSクラスの変更やデータの変更ぐらいは問題ありませんが、新しいコンポーネントを表示するような変更はなるべくやりません。この理由については[Stimulus中のHTML生成を避ける理由](/concepts/why-avoid-rendering-html-in-stimulus)で解説しています
* **レスポンスはなるべく早くしたいか？:** 例えば「いいね」ボタンでオン・オフ状態を切り替えたい時、サーバからのレスポンスを待っているともっさりしたUI/UXになります。この場合はブラウザネイティブもしくはStimulusのイベント処理で楽観的UI(Optimistic UI)を作ることを検討します
* **実装は簡単か？:** TurboとStimulusの双方で実装できるものの、Turboの方が簡単に実装できることはしばしばあります。この場合はまず最初にTurboで実装することが多いです。レスポンスを早くしたいと考えた時点で、Stimulusもしくはブラウザネイティブに切り替えるのが良いでしょう

## 私のやり方: 時期尚早な最適化を避ける --- how-i-do-it

上述のように、TurboとStimulusのどれを使うかは単純ではありません。開発の初期から考えすぎないことも重要です。私は通常、下記の順番で開発しています。

1. 最初は実装のしやすさを重視します。通常、一番実装しやすいのはMPAですので、画面の部分置換をしないMPAで実装します。Turbo Driveのおかげで、MPAとして作ってもSPAのサクサク感がありますので、これだけで十分ということがほとんどです
2. 次にTurbo FramesやTurbo Streamsを使って、画面の部分置換を少しずつ導入します。通常は数行の小さな変更で済みますが、コードは僅かでも間違いなく複雑化していますので、なるべくわかりやすさを保つように意識します
3. 最後にUI/UXの不足分をStimulusで補います
4. レスポンスの速さが問題になる場合はTurboを使っているところをなくし、ブラウザネイティブもしくはStimulusのみで実装できないかを検討します。やはりコードは複雑化しますので、メンテナンス性も含めて本当にこれを実施する必要性を確認するべきです

インタラクティブUI/UXは最適化と捉えるのが良いと思います。[時期尚早な最適化を避ける](https://ja.wikipedia.org/wiki/最適化_(情報工学)#最適化する時期)意味でもMPAから出発し、段階的にインタラクティブな要素を追加するのが良いのではないかと思います。

経験の浅いデザイナーが実装コストを深く考えないで、過剰にインタラクティブなデザインを作ってしまうことがあります。このような場合はよく相談して、不必要に難しいものを作らない方が良いでしょう。
