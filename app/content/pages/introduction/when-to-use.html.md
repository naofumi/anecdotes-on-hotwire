---
title: Hotwireが適している局面
section: Introduction
layout: section
order: 005
---

## 優れたUI/UXを提供したい場合

**「Hotwireは難しいUIはできない」**、**「エンドユーザ向けの画面はやはりReactを使った方が良い」** という話はよく聞きます。**これは大きな誤りである**と私は確信しています。そして証明しているのが[「フロントエンドエンジニアのためのHotwire入門」](https://hotwire-n-next.castle104.com)というウェブサイトです。Hotwireの方がむしろ優れているケースは珍しくありません。

## 小さいチームで開発する場合

HotwireはJSON APIがありません。APIの両岸でフロントエンドエンジニアとバックエンドエンジニアが対峙するのではなく、互いに密に連携し、自主的に協力し合いながら製品を作り上げていくチームに向いています。

## フロントエンドエンジニアがバックエンドの学習にも積極的

OOUI(オブジェクト指向UI)の世界では、デザイナーやフロントエンドエンジニアもデータ構造を大雑把に理解している必要があります。理解していなければ良いデザインが作れません。

そのような意識がチーム内にあれば、フロントエンドエンジニアはデータ構造もRubyも理解しようとするでしょう。バックエンドエンジニアもそれを伝えようとするでしょう。こういうチームならHotwireは向いています。

## 社員のモチベーションやエンゲージメントを高めたい場合

分業体制は社員のモチベーションやエンゲージメントのネガティブに作用しがちです。最終成果物に対するコミットメントが薄くなります。

## いいとこ取りをしたい場合

Hotwireでも難しいUI/UXは作成できます。しかし既にReactの優れたライブラリーが存在していることもあります。この場合はいいとこ取りをしましょう。Hotwireをベースに、Reactを使いたいページだけに埋め込めます。またReactコンポーネントをStimulusで制御できます。