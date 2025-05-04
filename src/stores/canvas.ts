import { defineStore } from "pinia";

export const useCanvasStore = defineStore("canvas", {
  // 定义状态
  state: () => ({
    cardTitleValue:'Dev Business Card.json',
    cardRadius:true,
    clip_r: 0,
    clip_x: 0,
    clip_y: 0,
    clip_w: 0,
    clip_h: 0,
    //
    KeyValue_y: 0,
    endComma: "",
    metricsKey: {},
    metricsValue: {},
    value_x: 0,
    marginLeftAll: 20,
    marginLeftCode: 15,
    fields_y: 0,
    // loadAndDrawImage
    index: 0,
    totalImages: 0,
    iconMargins: 0,
    img: HTMLImageElement,
  }),

  // 定义计算属性
  getters: {},

  // 定义行为
  actions: {
    drawCard(
      imageUrls: { name: string; path: string }[],
      fields: { key: string; value: string }[]
    ) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 1110;
      canvas.height = 700;
      let canvasWidth = canvas.width;
      let canvasHeight = canvas.height;
      if (ctx) {
        let clip_r = (this.clip_r = 30);
        let clip_x = (this.clip_x = 0);
        let clip_y = (this.clip_y = 0);
        let clip_w = (this.clip_w = canvasWidth);
        let clip_h = (this.clip_h = canvasHeight);
        /* 绘制圆角 */
        if (this.cardRadius) {
          ctx.beginPath();
          ctx.moveTo(clip_x + clip_r, clip_y);
          ctx.arcTo(
            clip_x + clip_w,
            clip_y,
            clip_x + clip_w,
            clip_y + clip_h,
            clip_r
          );
          ctx.arcTo(
            clip_x + clip_w,
            clip_y + clip_h,
            clip_x,
            clip_y + clip_h,
            clip_r
          );
          ctx.arcTo(clip_x, clip_y + clip_h, clip_x, clip_y, clip_r);
          ctx.arcTo(clip_x, clip_y, clip_x + clip_w, clip_y, clip_r);
          ctx.closePath();
          ctx.clip();
        }

        // 背景
        ctx.fillStyle = "#1b1b17";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // 标题
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvasWidth, 76);

        // icon标题
        ctx.fillStyle = "#2b2b2b";
        ctx.fillRect(0, 75, canvasWidth, 86);

        // 绘制圆点
        let titlePointColor = ["#ff5f57", "#ffbc2a", "#29c840"];
        let titlePointX = 60;

        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(titlePointX, 34, 18, 0, Math.PI * 2);
          ctx.fillStyle = titlePointColor[i];
          ctx.fill();
          titlePointX += 55;
        }

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";

        // 标题文字
        let title = this.cardTitleValue;
        ctx.font = "48px Arial";
        ctx.fillText(title, canvasWidth / 2 + 30, 54);//76

        // 三点
        let threePoint = "···";
        ctx.font = "600 50px Arial";
        ctx.fillText(threePoint, canvasWidth - 100, 55);

        let fields_y = (this.fields_y = 210);
        let marginLeftAll = this.marginLeftAll;
        let marginLeftCode = this.marginLeftCode;

        ctx.textAlign = "start";
        ctx.font = "40px Arial";
        // 花括号
        ctx.fillText("{", 72 + marginLeftAll + marginLeftCode, fields_y);
        // 行号
        for (let i = 0; i < fields.length + 2; i++) {
          ctx.fillText(`${i + 1}`, 25 + marginLeftAll, fields_y);
          fields_y += 55;
        }
        // 花括号
        ctx.fillText("}", 72 + marginLeftAll + marginLeftCode, fields_y - 58);

        // 键值对
        let KeyValue_y = (this.KeyValue_y = 265);
        let endComma = (this.endComma = ",");
        let metricsKey = this.metricsKey;
        let metricsValue = this.metricsValue;

        let value_x = (this.value_x = 0);

        for (let i = 0; i < fields.length; i++) {
          // key
          ctx.fillStyle = "#ce9178";
          ctx.fillText(
            `"${fields[i].key}" : `,
            120 + marginLeftAll + marginLeftCode,
            KeyValue_y
          );

          // value
          metricsKey = ctx.measureText(fields[i].key);
          value_x = metricsKey.width + 190 + marginLeftAll + marginLeftCode;
          ctx.fillStyle = "#e7db74";
          ctx.fillText(` "${fields[i].value}"`, value_x, KeyValue_y);

          // Comma
          ctx.fillStyle = "#fff";
          metricsValue = ctx.measureText(fields[i].value);
          ctx.fillText(
            ` ${endComma}`,
            metricsValue.width + value_x + 30,
            KeyValue_y
          );
          KeyValue_y += 55;

          if (i == fields.length - 2) {
            endComma = "";
          }
        }

        this.drawIcon(imageUrls, ctx, canvas);

        // end
      }
    },

    drawIcon(imageUrls: { name: string; path: string }[], ctx: any, canvas) {
      let that = this;
      let index = this.index;
      let totalImages = (this.totalImages = imageUrls.length);
      let iconMargins = this.iconMargins;
      let img = this.img;

      function loadAndDrawIcon() {
        let img = new Image();

        img.src = imageUrls[index].path;

        img.onload = () => {
          // 保存画布状态
          ctx.save();

          // 绘制圆角矩形
          let x = 10 + iconMargins; // 图片的起始x坐标
          let y = 83; // 图片的起始y坐标
          let width = 70; // 图片宽度  86
          let height = 70; // 图片高度
          let radius = 20;

          // 绘制圆角路径
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width - radius,
            y + height
          );
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();

          // 裁剪路径
          ctx.clip();
          // 背景
          ctx.fillStyle = "#fff";
          ctx.fillRect(x, y, width, height);
          // 绘制图片
          ctx.drawImage(img, x, y, width, height);

          // 恢复画布状态
          ctx.restore();

          // 绘制下一张图片
          index++;
          iconMargins += 80;

          if (index >= totalImages) {
            that.saveCardImage(canvas);
          } else {
            loadAndDrawIcon();
          }
        };
      }

      loadAndDrawIcon();
    },

    saveCardImage: (canvas: HTMLCanvasElement) => {
      const timestamp = new Date().getTime();
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `devCard${timestamp}.png`;
      link.click();
    },
    setCardRadius(radius:boolean){
      this.cardRadius = radius
  },   
  setcardTitleValue(title:string){
    this.cardTitleValue = title
}

  },
});
