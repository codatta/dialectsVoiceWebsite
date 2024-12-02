# Dialect Collection Tool MVP Technical Implementation Document

## 1. Audio
- @wavesurfer/react
- https://codesandbox.io/p/sandbox/react-wavy-audio-example-forked-h8cm9?file=%2Fsrc%2FApp.js
- https://wavesurfer.xyz/examples/?record.js
- https://codesandbox.io/p/sandbox/simple-audio-recorder-with-wavesurfer-v86mc?file=%2Fsrc%2FSimpleRecorder.js
- https://codepen.io/davidtorroija/pen/WYaKPq
- https://codesandbox.io/p/sandbox/simple-audio-recorder-react-audio-analyser-with-wavesurfer-x3str?file=%2Fsrc%2FApp.js
- https://wavesurfer_recorder_typescript.surge.sh/

## 2.参考
- https://labelstud.io/
- http://www.voxforge.org/
- https://commonvoice.mozilla.org/zh-CN/speak

## 3.需求文档
- https://chaintool.larksuite.com/wiki/ZL5Qwb0IgiSOEekWc0UuqRmTsW4?from=from_copylink
- https://chaintool.larksuite.com/docx/SIC5dMfqko05NHx66UUuu2uOsre?from=from_copylink


## 4.录音界面
- loading
- 最后一个录制界面
- 记录时长
- 状态恢复
- 小程序开发
- 结果页
- 已录音且未完成时，且页面弹出提示蒙层
- 监听录音时长，太短则提示太短
- 多语言，需要支持哪些语言，文案需要Tess帮忙看看
- 团长邀请码
- 调整语音提示位置
- 去掉自由对话
- 增加自由录音的文案复制提示
- 朗读，从剩余的文案中挑选一个来做，不限制录制总数，当语料库读完后，则给提示
- 提交后，给一个toast提示
- 记录已完成数段数和时长展示


## 5. 朗读交互优化
- 