export interface Practice {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  guidance: string[];
  closingMessage: string;
}

export const practices: Practice[] = [
  {
    id: 1,
    title: "朝の内側を整える時間",
    description: "今日、愛と感謝を源泉にして生きると決める",
    duration: "3分",
    durationSeconds: 180,
    guidance: [
      "目を閉じて、ゆっくり深呼吸をしてください。",
      "今日一日、どんな自分でありたいか。\nイメージしてみましょう。",
      "パートナーの顔を思い浮かべてください。\nその人への感謝を、ひとつ見つけましょう。",
      "「今日も、愛と感謝を源泉にして生きる」\nそう心の中で宣言しましょう。",
    ],
    closingMessage: "今日も、内側から整った一日を。",
  },
  {
    id: 2,
    title: "インサイドアウトの実践",
    description: "パートナーを変えようとせず、まず自分の在り方を整える",
    duration: "1分",
    durationSeconds: 60,
    guidance: [
      "今、パートナーに対して感じていることは何ですか？",
      "その感情の奥にあるものに、目を向けてみましょう。",
      "相手を変えたいと思うとき、\nそれは自分の何が満たされていないサインかもしれません。",
      "まず自分の内側を整える。\nそこから始めましょう。",
    ],
    closingMessage: "外側は、内側の反映です。",
  },
  {
    id: 3,
    title: "夜の静かなふりかえり",
    description: "今日の自分を受け止め、愛から生きられたかをふりかえる",
    duration: "5分",
    durationSeconds: 300,
    guidance: [
      "今日一日を、静かにふりかえりましょう。",
      "愛から行動できた瞬間は、ありましたか？\n小さなことでも構いません。",
      "うまくいかなかったことがあっても、\nそれに気づけた自分を認めましょう。",
      "明日も、自分の内側から愛を生きると決めて、\n今日を手放しましょう。",
    ],
    closingMessage: "おつかれさまでした。今日もよく頑張りました。",
  },
];

export function getPracticeById(id: number): Practice | undefined {
  return practices.find((p) => p.id === id);
}
