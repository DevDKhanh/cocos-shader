import { _decorator, Component, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Uv1')
export default class spritearrow extends Component {
      
      time = 0
      _material

      start() {
            this.time = 0;
            this._material = this.getComponent(Sprite).getSharedMaterial(0);
      }
 
      update() {
            this.time += 0.01;
            this._material.setProperty('time', this.time);
      }
}
