# pixela-journal-tweet

## In Japanese

### 概要
[Pixela](https://pixe.la/ja) のグラフを毎日ツイートするための `Node.js` によるスクリプトです。
このドキュメントでは、Pixelaですでにグラフが存在している状態を前提としています。

### 使い方

#### 環境変数の設定
`.env-templete` を元に、同階層に `.env` を作成し、各値を設定します。

#### 実行
以下のコマンドを実行します。
`{}` 内は自分の環境に合わせて変更してください。

```
npm run journal-tweet -- --user {YOUR_USER_NAME} --graphid {YOUR_GRAPH_ID}
```

## In English

### How To Use

#### Setting Environment
Create `.env` in the same directory based on `.env-templete`.
Change the values of the `.env` to your environment.

#### Run
Execute the following command.
Change the values of `{}` according to your environment.

```
npm run journal-tweet -- --user {YOUR_USER_NAME} --graphid {YOUR_GRAPH_ID}
```