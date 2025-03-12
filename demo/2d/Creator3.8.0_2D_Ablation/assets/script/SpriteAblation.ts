import { _decorator, Component, Slider, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SpriteAblation")
export class SpriteAblation extends Component {
  @property([Sprite])
  sp_dissolve: Sprite[] = [];

  value: number = 0;
  d = 1;

  protected onLoad(): void {
    this.schedule(() => {
      if (this.value > 1) this.d = -1;
      else if (this.value < 0) this.d = 1;

      this.value += (1 / 60) * this.d;

      console.log(this.value, this.d);

      this.sp_dissolve.forEach((sp) => {
        sp.getSharedMaterial(0)!.setProperty("noiseThreshold", this.value);
      });
    }, 1 / 60);
  }

  protected update(dt: number): void {
    if (this.value > 1) this.d = -1;
    else if (this.value < 0) this.d = 1;

    this.value += (dt / 3) * this.d;

    this.sp_dissolve.forEach((sp) => {
      sp.getSharedMaterial(0)!.setProperty("noiseThreshold", this.value);
    });
  }
}
