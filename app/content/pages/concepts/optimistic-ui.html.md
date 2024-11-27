---
title: 楽観的UI
section: Performance
layout: article
order: 05
---

## 楽観的(Optimistic) UI 

楽観的UIは簡単にいうと、POSTなどのmutationに対して、サーバからの応答を待たずにUIを更新させることを言います。

Hotwireで考えるときは、大きく２つに分けると良いと思います。

### HTMLを変更しなくても良い楽観的 UI

例えば`<input type="checkbox">`(チェックボックス)や`<input type="radio">`(ラジオボタン)はネイティブなままでも楽観的 UIを提供してくれます。チェックボックスはクリックすればチェックが入り、またラジオボタンもクリックすれば選択されます。一切のJavaScriptを書かなくても、またサーバとの通信をしなくても、HTML要素のステートは変更されます。

またチェックボックスやラジオボタンのステートはCSS擬似セレクタの`:checked`で検知できますので、CSSさえ書けばオン・オフ時の表示を自在に変更できます。さらに`:has`擬似セレクターを使えば親HTML要素の表示も変えられます。

このように一切JavaScriptを書かなくても、かなりの楽観的 UIが作れます

### HTMLの変更が必要な楽観的 UI

例えばチャックアプリを作っていて、