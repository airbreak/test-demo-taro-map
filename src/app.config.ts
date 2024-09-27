export default defineAppConfig({
  pages: [
    'pages/index/index',
  ],
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于显示您和车辆之间的地图显示"
    },
    "scope.bluetooth": {
      desc: "方便您近场控制车辆"
    }
  },
})
