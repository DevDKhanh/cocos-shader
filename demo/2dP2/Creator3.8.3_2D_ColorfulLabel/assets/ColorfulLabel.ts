import { _decorator, Component, instantiate, Label, Material, Node, UITransform, v4, Vec4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColorfulLabel')
export class ColorfulLabel extends Component {
    @property({ type: Label, tooltip: "测试文字1" })
    testLabel1: Label = null;
    @property({ type: Label, tooltip: "测试文字2" })
    testLabel2: Label = null;
    @property({ type: Label, tooltip: "测试文字3" })
    testLabel3: Label = null;
    @property({ type: Material, tooltip: "替换材质" })
    testMaterial: Material = null;

    private tmpColorPos: Vec4[] = [];
    private tmpColor: Vec4[] = [];

    start() {
        // 测试代码
        this.tmpColor = [];
        this.tmpColorPos = [];
        this.modifyColor(this.testLabel1, "a", new Vec4(255, 0, 0, 255));
        this.modifyColor(this.testLabel1, "l", new Vec4(255, 255, 0, 255));
        this.modifyColor(this.testLabel1, "b", new Vec4(255, 0, 255, 255));
        this.modifyColor(this.testLabel1, "e", new Vec4(0, 0, 255, 255));
        const testMat1 = new Material();
        testMat1.copy(this.testMaterial);
        this.testLabel1.customMaterial = testMat1;
        this.fillData();
        testMat1.setProperty("colorPos", this.tmpColorPos);
        testMat1.setProperty("newSetColor", this.tmpColor);

        this.tmpColor = [];
        this.tmpColorPos = [];
        this.modifyColor(this.testLabel2, "木", new Vec4(200, 0, 0, 255));
        this.modifyColor(this.testLabel2, "限", new Vec4(200, 200, 0, 255));
        this.modifyColor(this.testLabel2, "东", new Vec4(200, 0, 200, 255));
        const testMat2 = new Material();
        testMat2.copy(this.testMaterial);
        this.testLabel2.customMaterial = testMat2;
        this.fillData();
        testMat2.setProperty("colorPos", this.tmpColorPos);
        testMat2.setProperty("newSetColor", this.tmpColor);

        this.tmpColor = [];
        this.tmpColorPos = [];
        this.modifyColorByIndex(this.testLabel3, 2, 5, new Vec4(200, 0, 0, 255));
        const testMat3 = new Material();
        testMat3.copy(this.testMaterial);
        this.testLabel3.customMaterial = testMat3;
        this.fillData();
        testMat3.setProperty("colorPos", this.tmpColorPos);
        testMat3.setProperty("newSetColor", this.tmpColor);
    }

    /** 
     * 修改目标内容的文本颜色
     * @param targetLabel 目标文本组件
     * @param targetChar 目标修改字符（会查找本字符串首个字符并修改颜色）
     * @param targetColor 目标修改颜色
     */
    modifyColor(targetLabel: Label, targetChar: string, targetColor: Vec4) {
        let newNode = new Node();
        newNode.addComponent(UITransform);
        let newLabel = newNode.addComponent(Label);
        newLabel.fontSize = targetLabel.fontSize;
        newLabel.lineHeight = targetLabel.lineHeight;

        newLabel.string = targetChar;
        newLabel.updateRenderData(true);
        const target_w = newNode.getComponent(UITransform).width;
        const total_w = targetLabel.node.getComponent(UITransform).width;
        const str = targetLabel.string;
        const index = str.indexOf(targetChar);
        let begin_w = 0;
        if (index > -1) {
            const tmpStr = str.slice(0, index);
            newLabel.string = tmpStr;
            newLabel.updateRenderData(true);
            begin_w = newNode.getComponent(UITransform).width;

            const begin = begin_w / total_w;
            const end = (begin_w + target_w) / total_w;

            this.tmpColorPos.push(v4(begin, end));
            this.tmpColor.push(targetColor);
        }

        newLabel = null;
        newNode = null;
    }

    /**
     * 修改指定内容的文本颜色
     * @param targetLabel 目标文本组件
     * @param beginIndex 开始修改字符下标索引
     * @param endIndex 结束修改字符下标索引
     * @param color 修改颜色
     */
    modifyColorByIndex(targetLabel: Label, beginIndex: number, endIndex: number, color: Vec4) {
        if (beginIndex <= 0) beginIndex = 0;
        if (endIndex >= targetLabel.string.length) endIndex = targetLabel.string.length;
        let newNode = new Node();
        newNode.addComponent(UITransform);
        let newLabel = newNode.addComponent(Label);
        newLabel.fontSize = targetLabel.fontSize;
        newLabel.lineHeight = targetLabel.lineHeight;
        newLabel.string = "";
        for (let i = beginIndex; i <= endIndex; i++) {
            newLabel.string += targetLabel.string[i];
        }
        newLabel.updateRenderData(true);
        const target_w = newNode.getComponent(UITransform).width;
        const total_w = targetLabel.node.getComponent(UITransform).width;
        const str = targetLabel.string;
        const tmpStr = str.slice(0, beginIndex);
        newLabel.string = tmpStr;
        newLabel.updateRenderData(true);
        let begin_w = newNode.getComponent(UITransform).width;
        const begin = begin_w / total_w;
        const end = (begin_w + target_w) / total_w;

        this.tmpColorPos.push(v4(begin, end));
        this.tmpColor.push(color);

        newLabel = null;
        newNode = null;
    }

    /** 数据不全 */
    fillData() {
        if (this.tmpColorPos.length < 32) {
            const diff = 32 - this.tmpColorPos.length;
            for (let i = 0; i < diff; i++) {
                this.tmpColorPos.push(v4(1, 1));
                this.tmpColor.push(new Vec4(255, 0, 0, 0));
            }
        }
    }
}
