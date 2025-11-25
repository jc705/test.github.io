System.register("chunks:///_virtual/DailyTasksView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIView.ts', './tea.decorators.ts', './Config.ts', './GetRewardView.ts', './MyReqHttp.ts', './SingletonFactory.ts', './DataCenter.ts', './AssetsManager.ts', './GlobalContext.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, find, UITransform, Label, SpriteFrame, Sprite, Node, Tween, tween, v3, ScrollView, instantiate, PopView, Path, Sort, GetRewardView, MyReqHttp, SingletonFactory, DataCenter, AssetsManager, BundleName;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      find = module.find;
      UITransform = module.UITransform;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Node = module.Node;
      Tween = module.Tween;
      tween = module.tween;
      v3 = module.v3;
      ScrollView = module.ScrollView;
      instantiate = module.instantiate;
    }, function (module) {
      PopView = module.PopView;
    }, function (module) {
      Path = module.Path;
    }, function (module) {
      Sort = module.Sort;
    }, function (module) {
      GetRewardView = module.default;
    }, function (module) {
      MyReqHttp = module.default;
    }, function (module) {
      SingletonFactory = module.default;
    }, function (module) {
      DataCenter = module.default;
    }, function (module) {
      AssetsManager = module.default;
    }, function (module) {
      BundleName = module.BundleName;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "1dd73EZVv9DIpG30jSU6zds", "DailyTasksView", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      const getGameIcon = {
        '30000007': () => {
          return 'game_poker';
        },
        '30000406': () => {
          return 'game_rummy';
        },
        '12101105': () => {
          return 'game_tp';
        }
      };
      const getGameSort = {
        '30000007': () => {
          return Sort.dzpk;
        },
        '30000406': () => {
          return Sort.pointRummy;
        },
        '12101105': () => {
          return Sort.zjh;
        }
      };
      const getTypeIcon = {
        '1': gameId => {
          return 'luckspin';
        },
        '2': gameId => {
          return getGameIcon[gameId] && getGameIcon[gameId]() || "";
        }
      };
      let DailyTasksView = exports('default', (_dec = ccclass('DailyTasksView'), _dec2 = Path("popBase"), _dec3 = Path("popBase/btn_close"), _dec4 = Path("item"), _dec5 = Path("popBase/scrollView", ScrollView), _dec(_class = (_class2 = class DailyTasksView extends PopView {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "popBase", _descriptor, this);
          _initializerDefineProperty(this, "closeBtn", _descriptor2, this);
          _initializerDefineProperty(this, "itemPre", _descriptor3, this);
          _initializerDefineProperty(this, "scrollView", _descriptor4, this);
        }
        get dataCenter() {
          return SingletonFactory.getInst(DataCenter);
        }
        onMount() {
          this.closeBtn.on("click", this.onClickCloseBtn, this);
        }
        onShow() {
          this.refreshList();
          this.showPopAnim();
        }
        refreshList() {
          const daily_tasks_lst = 'https://djapi.szhmkeji.com/api/daily_tasks/lst';
          let myUID = this.dataCenter.getMyInfo().userID;
          let params = {
            userID: myUID,
            cacheTime: 6000000 //要读缓存数据，避免缓存数据被清除了
          };

          let showTaskUI = res => {
            if (res.status == 0) {
              this.scrollView.content.removeAllChildren();
              const list = res.data;
              list.sort((a, b) => {
                let num = 0;
                a.receive == 1 && num++;
                b.receive == 1 && num--;
                a.receive == 0 && a.rate >= a.target && num--;
                b.receive == 0 && b.rate >= b.target && num++;
                return num;
              });
              let has = 0;
              for (let i = 0; i < list.length; i++) {
                const element = list[i];
                let item = instantiate(this.itemPre);
                this.initItem(element, item);
                if (has == 0 && element.rate >= element.target && element.receive == 0) {
                  has = 1;
                }
              }
              // App.redPointManager.DailyTaskRedPoint = has;
            }
          };

          MyReqHttp.post(daily_tasks_lst, params, res => {
            showTaskUI(res);
          }, null, daily_tasks_lst, res => {
            showTaskUI(res);
          });
        }
        initItem(element, item) {
          const MaxProgressBar = 274;
          let icon = find("icon", item);
          let completed = find("completed", item);
          let geryBtn = find("geryBtn", item);
          let collectBtn = find("collectBtn", item);
          let goBtn = find("goBtn", item);
          let rewardIcon = find("reward/icon", item);
          let rewardLabel = find("reward/label", item);
          let desc = find("desc", item);
          let progressBar = find("ProgressBar/bar", item);
          let progressUITrans = progressBar.getComponent(UITransform);
          let progressLabel = find("ProgressBar/label", item);
          let mask = find("mask", item);
          const rate = Math.min(element.rate, element.target);
          progressLabel.getComponent(Label).string = `${rate}/${element.target}`;
          progressUITrans.width = rate / element.target * MaxProgressBar;
          desc.getComponent(Label).string = element.name;
          // App.asset.load(Macro.BUNDLE_HALL, 'texture/hallItem/DailyTasksView/TaskIcon/' + getTypeIcon[element.typeID](element.gameID), SpriteFrame, null, (cache) => {
          //     icon.getComponent(Sprite).spriteFrame = cache.data as SpriteFrame;
          // });
          // App.asset.load(Macro.BUNDLE_RESOURCES, 'common/texture/rewardIcons/' + element.rewardType, SpriteFrame, null, (cache) => {
          //     rewardIcon.getComponent(Sprite).spriteFrame = cache.data as SpriteFrame;
          //     rewardLabel.getComponent(Label).string = element.rewardAmount;
          // });
          AssetsManager.loadSpriteFrame('textures/images/DailyTasksView/TaskIcon/' + getTypeIcon[element.typeID](element.gameID), SpriteFrame, (err, assets) => {
            if (err) {
              ERROR(err);
              return;
            }
            rewardIcon.getComponent(Sprite).spriteFrame = assets;
            rewardLabel.getComponent(Label).string = element.rewardAmount;
          });
          AssetsManager.loadSpriteFrame('textures/images/DailyTasksView/TaskIcon/' + getTypeIcon[element.typeID](element.gameID), BundleName.Hall, SpriteFrame, (err, assets) => {
            if (err) {
              ERROR(err);
              return;
            }
            icon.getComponent(Sprite).spriteFrame = assets;
          });
          completed.active = element.receive == 1;
          mask.active = element.receive == 1;
          collectBtn.active = element.rate >= element.target && element.receive == 0;
          if (element.typeID == 2) {
            geryBtn.active = false;
            goBtn.active = element.rate < element.target;
            goBtn.on(Node.EventType.TOUCH_END, () => {
              this.onClickGoBtn(getGameSort[element.gameID]());
            });
          } else {
            goBtn.active = false;
            geryBtn.active = element.rate < element.target;
          }
          this.scrollView.content.addChild(item);
          item.x = 0;
          item.active = true;
          collectBtn.on(Node.EventType.TOUCH_END, () => {
            this.onClickCollectBtn(element);
          });
        }
        showPopAnim() {
          Tween.stopAllByTarget(this.popBase);
          tween(this.popBase).set({
            scale: v3(0, 0, 1)
          }).to(0.4, {
            scale: v3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start();
        }
        onClickCollectBtn(item) {
          const url = 'https://djapi.szhmkeji.com/api/daily_tasks/receive';
          let myUID = this.dataCenter.getMyInfo().userID;
          let params = {
            userID: myUID,
            id: item.id
          };
          MyReqHttp.post(url, params, res => {
            if (res.status == 0) {
              this.dataCenter.setMyInfoMoney(res.data.money);
              // App.uiManager.open({
              //     type: GetRewardView,
              //     bundle: Macro.BUNDLE_HALL,
              //     zIndex: ViewZOrder.UI,
              //     name: "GetRewardView",
              //     args: { reward: item.rewardType, desc: item.rewardAmount }
              // });
              GetRewardView.show(999);
              this.refreshList();
            }
          });
        }
        onClickCloseBtn(e) {
          Tween.stopAllByTarget(this.popBase);
          tween(this.popBase).to(0.2, {
            scale: v3(0, 0, 1)
          }).call(() => {
            this.hide();
          }).start();
        }
        onClickGoBtn(sort) {
          this.hide();
          // App.uiManager.open({ type: RoomListView, bundle: Macro.BUNDLE_HALL, zIndex: ViewZOrder.UI, name: "roomListView", args: { gameSort: sort } });
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "popBase", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemPre", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GetRewardView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIView.ts', './tea.decorators.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Tween, tween, v3, Sprite, Label, PopView, Path;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Tween = module.Tween;
      tween = module.tween;
      v3 = module.v3;
      Sprite = module.Sprite;
      Label = module.Label;
    }, function (module) {
      PopView = module.PopView;
    }, function (module) {
      Path = module.Path;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "88160GAlnNIh6LEWGhSd0PI", "GetRewardView", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let GetRewardView = exports('default', (_dec = ccclass('GetRewardView'), _dec2 = Path("popBase"), _dec3 = Path("popBase/rewardCloseBtn"), _dec4 = Path("popBase/wupubkuang/reward", Sprite), _dec5 = Path("popBase/numLabel", Label), _dec(_class = (_class2 = class GetRewardView extends PopView {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "rewardPanelpopBase", _descriptor, this);
          _initializerDefineProperty(this, "rewardCloseBtn", _descriptor2, this);
          _initializerDefineProperty(this, "rewardIcon", _descriptor3, this);
          _initializerDefineProperty(this, "num", _descriptor4, this);
        }
        onMount() {
          this.rewardCloseBtn.on("click", this.onClickCloseBtn, this);
        }
        onShow() {
          this.showPopAnim();
        }
        onInit(count) {
          this.initUI(count);
        }
        initUI(count) {
          this.num.string = `₹${count}`;
          // App.asset.load('resources', 'common/texture/rewardIcons/' + this.args.reward, SpriteFrame, null, (cache)=>{
          // this.rewardIcon.spriteFrame = cache.data as SpriteFrame;
          // let desc = this.args.desc;
          // if (this.args.reward != RewardType.Null) {
          // `${this.args.reward}` == '1001' && (desc = '₹' + desc);
          // this.num.string = desc;
          // }else{
          // this.num.string = '';
          // }
          // });
        }

        showPopAnim() {
          Tween.stopAllByTarget(this.rewardPanelpopBase);
          tween(this.rewardPanelpopBase).set({
            scale: v3(0, 0, 1)
          }).to(0.4, {
            scale: v3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start();
        }
        onClickCloseBtn(e) {
          Tween.stopAllByTarget(this.rewardPanelpopBase);
          tween(this.rewardPanelpopBase).to(0.2, {
            scale: v3(0, 0, 1)
          }).call(() => {
            this.hide();
          }).start();
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rewardPanelpopBase", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rewardCloseBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rewardIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "num", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Hall", ['./DailyTasksView.ts', './GetRewardView.ts', './HallView.ts', './LoginBoxView.ts', './LoginView.ts', './RouletteWheelView.ts'], function () {
  return {
    setters: [null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/HallView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIView.ts', './tea.decorators.ts', './VirtualList.ts', './Config.ts', './AssetsManager.ts', './GlobalContext.ts', './RouletteWheelView.ts', './DailyTasksView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, find, sp, Sprite, SpriteFrame, FullView, Path, VirtualList, GAME_LIST, GameType, AssetsManager, BundleName, RouletteWheelView, DailyTasksView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      find = module.find;
      sp = module.sp;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      FullView = module.FullView;
    }, function (module) {
      Path = module.Path;
    }, function (module) {
      VirtualList = module.VirtualList;
    }, function (module) {
      GAME_LIST = module.GAME_LIST;
      GameType = module.GameType;
    }, function (module) {
      AssetsManager = module.default;
    }, function (module) {
      BundleName = module.BundleName;
    }, function (module) {
      RouletteWheelView = module.default;
    }, function (module) {
      DailyTasksView = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "75e7a4ZKe1ER77KqqGuySjl", "HallView", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let HallView = exports('HallView', (_dec = ccclass('HallView'), _dec2 = Path("gameItem"), _dec3 = Path("games", VirtualList), _dec4 = Path("left_spines/LuckySpinBtn"), _dec5 = Path("left_spines/DailyTasksBtn"), _dec(_class = (_class2 = class HallView extends FullView {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "gameItem", _descriptor, this);
          _initializerDefineProperty(this, "games", _descriptor2, this);
          _initializerDefineProperty(this, "luckySpinBtn", _descriptor3, this);
          _initializerDefineProperty(this, "dailyTasksBtn", _descriptor4, this);
          this.gameList = [];
        }
        async onMount() {
          this.gameList.length = 0;
          this.gameList = GAME_LIST.filter(item => item.type === GameType.LIST);
          this.luckySpinBtn.on("click", this.onClickLuckySpinBtn.bind(this));
          this.dailyTasksBtn.on("click", this.onClickDailyTasksBtn.bind(this));
          this.games.init(this.gameList.length, (index, itemNode, textNode) => {
            const data = this.gameList[index];
            const spine = find("spine", itemNode).getComponent(sp.Skeleton);
            const sprite = find("mask/bg", itemNode).getComponent(Sprite);
            AssetsManager.load(data.animation, BundleName.Hall, sp.SkeletonData, (err, assets) => {
              if (err) {
                ERROR(err);
                return;
              }
              spine.skeletonData = assets;
              spine.setAnimation(0, "animation", true);
            });
            AssetsManager.loadSpriteFrame(data.cover, BundleName.Hall, SpriteFrame, (err, assets) => {
              if (err) {
                ERROR(err);
                return;
              }
              sprite.spriteFrame = assets;
            });
          });
        }
        onClickLuckySpinBtn() {
          RouletteWheelView.show();
        }
        onClickDailyTasksBtn() {
          DailyTasksView.show();
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameItem", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "games", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "luckySpinBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "dailyTasksBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoginBoxView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIView.ts', './tea.decorators.ts', './EventManager.ts', './SingletonFactory.ts', './GlobalContext.ts', './LoadingTipView.ts', './HallView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, EditBox, PopView, Path, EventManager, Autowired, EventKey, LoadingTipView, HallView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EditBox = module.EditBox;
    }, function (module) {
      PopView = module.PopView;
    }, function (module) {
      Path = module.Path;
    }, function (module) {
      EventManager = module.default;
    }, function (module) {
      Autowired = module.Autowired;
    }, function (module) {
      EventKey = module.EventKey;
    }, function (module) {
      LoadingTipView = module.LoadingTipView;
    }, function (module) {
      HallView = module.HallView;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "a8b296WE0hBYpiFRJgkrK3h", "LoginBoxView", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let LoginBoxView = exports('LoginBoxView', (_dec = ccclass('LoginBoxView'), _dec2 = Autowired(EventManager), _dec3 = Path('login_bg/login_btn'), _dec4 = Path('login_bg/canel_btn'), _dec5 = Path('login_bg/register_btn'), _dec6 = Path('login_bg/phone_edit', EditBox), _dec7 = Path('login_bg/password_edit', EditBox), _dec8 = Path('register_btn'), _dec(_class = (_class2 = class LoginBoxView extends PopView {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "eventManager", _descriptor, this);
          _initializerDefineProperty(this, "loginBtn", _descriptor2, this);
          _initializerDefineProperty(this, "canelBtn", _descriptor3, this);
          _initializerDefineProperty(this, "registerBtn", _descriptor4, this);
          _initializerDefineProperty(this, "phoneEdit", _descriptor5, this);
          _initializerDefineProperty(this, "passwordEdit", _descriptor6, this);
          _initializerDefineProperty(this, "toRegisterBtn", _descriptor7, this);
          this._isAgree = false;
          this._state = -1;
        }
        set state(val) {
          if (val === this._state) return;
          this._state = val;
          switch (val) {
            case 0:
              this.registerBtn.active = false;
              this.canelBtn.active = false;
              this.loginBtn.active = true;
              this.toRegisterBtn.active = true;
              break;
            case 1:
              this.registerBtn.active = true;
              this.canelBtn.active = true;
              this.loginBtn.active = false;
              this.toRegisterBtn.active = false;
              break;
          }
        }
        onMount() {
          this.loginBtn.on("click", this.onClickLoginBtn, this);
          this.canelBtn.on("click", this.onClickCanelBtn, this);
          this.registerBtn.on("click", this.onClickRegisterBtn, this);
          this.toRegisterBtn.on("click", this.onClickToRegisterBtn, this);
        }
        onShow() {
          this.eventManager.on(EventKey.AGREEMENT_AGREE, this.setState, this);
          this.state = 0;
        }
        onHide() {
          this.eventManager.off(EventKey.AGREEMENT_AGREE, this.setState);
          this.state = -1;
        }
        setState(isAgree) {
          this._isAgree = isAgree;
        }
        onInit(state, isAgree) {
          this.state = state;
          this._isAgree = isAgree;
        }
        onClickLoginBtn() {
          LoadingTipView.show();
          this.scheduleOnce(() => {
            HallView.resetTo();
            LoadingTipView.hide();
          }, 2);
        }
        onClickCanelBtn() {
          this.state = 0;
        }
        onClickRegisterBtn() {
          LOG(this.phoneEdit.string, this.passwordEdit.string);
        }
        onClickToRegisterBtn() {
          this.state = 1;
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "eventManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loginBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "canelBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "registerBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "phoneEdit", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "passwordEdit", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "toRegisterBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoginView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIView.ts', './tea.decorators.ts', './LoginBoxView.ts', './EventManager.ts', './SingletonFactory.ts', './GlobalContext.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Toggle, onMount, FullView, Path, LoginBoxView, EventManager, Autowired, EventKey;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Toggle = module.Toggle;
    }, function (module) {
      onMount = module.onMount;
      FullView = module.FullView;
    }, function (module) {
      Path = module.Path;
    }, function (module) {
      LoginBoxView = module.LoginBoxView;
    }, function (module) {
      EventManager = module.default;
    }, function (module) {
      Autowired = module.Autowired;
    }, function (module) {
      EventKey = module.EventKey;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "12c18yxEipIMZm1+I4bgCIC", "LoginView", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let LoginView = exports('LoginView', (_dec = ccclass('LoginView'), _dec2 = Autowired(EventManager), _dec3 = Path('logo'), _dec4 = Path('btns'), _dec5 = Path('bottom_base'), _dec6 = Path('bottom_base/toggle', Toggle), _dec(_class = (_class2 = class LoginView extends FullView {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "eventManager", _descriptor, this);
          _initializerDefineProperty(this, "logo", _descriptor2, this);
          _initializerDefineProperty(this, "btns", _descriptor3, this);
          _initializerDefineProperty(this, "bottomNode", _descriptor4, this);
          _initializerDefineProperty(this, "toggle", _descriptor5, this);
        }
        mount() {
          this.btns.getChildByName('login_btn').on('click', this.onClickLogin, this);
          this.btns.getChildByName('register_btn').on('click', this.onClickRegister, this);
          this.toggle.node.on('toggle', this.onToggle, this);
        }
        onClickLogin() {
          this.logo.active = false;
          this.btns.active = false;
          LoginBoxView.show(0, this.toggle.isChecked);
        }
        onClickRegister() {
          this.logo.active = false;
          this.btns.active = false;
          LoginBoxView.show(1, this.toggle.isChecked);
        }
        onToggle(state) {
          this.eventManager.trigger(EventKey.AGREEMENT_AGREE, this.toggle.isChecked);
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "eventManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "logo", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btns", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bottomNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "toggle", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "mount", [onMount], Object.getOwnPropertyDescriptor(_class2.prototype, "mount"), _class2.prototype)), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RouletteWheelView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIView.ts', './tea.decorators.ts', './GetRewardView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, v3, Tween, tween, Button, UIOpacity, PopView, Path, GetRewardView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      Tween = module.Tween;
      tween = module.tween;
      Button = module.Button;
      UIOpacity = module.UIOpacity;
    }, function (module) {
      PopView = module.PopView;
    }, function (module) {
      Path = module.Path;
    }, function (module) {
      GetRewardView = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "a3410FR+V5MmoiiQ8pYSwmg", "RouletteWheelView", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let RouletteWheelView = exports('default', (_dec = ccclass('RouletteWheelView'), _dec2 = Path("popBase"), _dec3 = Path("popBase/close"), _dec4 = Path("popBase/lights"), _dec5 = Path("popBase/spinBtn"), _dec6 = Path("popBase/wheel_cir"), _dec7 = Path("popBase/women"), _dec8 = Path("popBase/wheel_Frame/lighting_bingo"), _dec(_class = (_class2 = class RouletteWheelView extends PopView {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "popBase", _descriptor, this);
          _initializerDefineProperty(this, "closeBtn", _descriptor2, this);
          _initializerDefineProperty(this, "lights", _descriptor3, this);
          _initializerDefineProperty(this, "spinBtn", _descriptor4, this);
          _initializerDefineProperty(this, "wheel", _descriptor5, this);
          _initializerDefineProperty(this, "women", _descriptor6, this);
          _initializerDefineProperty(this, "lightingBingo", _descriptor7, this);
          this.spinList = [];
          this.isShow = false;
        }
        onMount() {
          this.closeBtn.on("click", this.onClickCloseBtn, this);
          this.spinBtn.on("click", this.onClickSpinBtn, this);
        }
        onShow() {
          this.isShow = false;
          this.popBase.scale = v3(0, 0, 1);
          this.wheel.angle = 0;
          this.intoGame();
        }
        showReward(x) {
          GetRewardView.show(~~(Math.random() * 1000) + 1);
          // let type = RewardType.Gold;
          // switch (this.spinList[x].type) {
          //     case 1:
          //         type = RewardType.Null;
          //         break;
          //     case 2:
          //         type = RewardType.Gold;
          //         break;
          // }

          // App.uiManager.open({ type: GetRewardView, bundle: Macro.BUNDLE_HALL, zIndex: ViewZOrder.UI, name: "GetRewardView", args: { reward: type, desc: this.spinList[x].num } });
        }

        defaultSpinAnim(isBool) {
          let tep = 1;
          let childs = this.lights.children;
          childs.forEach((light, index) => {
            light.children[0].active = false;
          });
          Tween.stopAllByTarget(this.lights);
          tween(this.lights).repeat(4, tween(this.lights).delay(0.3).call(() => {
            childs.forEach((light, index) => {
              light.children[0].active = !light.children[0].active;
            });
          })).start();
          this.scheduleOnce(() => {
            Tween.stopAllByTarget(this.lights);
            tween(this.lights).repeatForever(tween(this.lights).delay(1).call(() => {
              tep ^= 1;
              childs.forEach((light, index) => {
                light.children[0].active = index % 2 == tep;
              });
            })).start();
          }, 1);
          Tween.stopAllByTarget(this.spinBtn);
          isBool && tween(this.spinBtn).repeatForever(tween(this.spinBtn).to(0.4, {
            scale: v3(1.05, 1.05, 1)
          }).to(0.4, {
            scale: v3(1, 1, 1)
          })).start();
          Tween.stopAllByTarget(this.wheel);
          isBool && tween(this.wheel).repeatForever(tween(this.wheel).set({
            angle: 0
          }).to(14, {
            angle: -360
          })).start();
          Tween.stopAllByTarget(this.women);
          tween(this.women).repeatForever(tween(this.women).by(1, {
            y: 5
          }).by(1, {
            y: -5
          })).start();
        }
        showPopAnim(cb) {
          cb && cb();
          Tween.stopAllByTarget(this.popBase);
          tween(this.popBase).set({
            scale: v3(0, 0, 1)
          }).to(0.4, {
            scale: v3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).call(() => {
            this.defaultSpinAnim(this.spinBtn.getComponent(Button).interactable);
          }).start();
        }
        intoGame() {
          this.showPopAnim(() => {
            this.spinBtn.getComponent(Button).interactable = true;
          });

          // let roomInfo = RoomListManager.getGoldRoomListByGameID(GlobalConfig.luckySpinId)[0];
          // roomInfo.GameType = 0;
          // RoomListManager.setRoomInfo(roomInfo);
          // App.gameManager.onGameUpdateSucceed();

          // new RouletteWheelLogic();
          // this.tableLogic.setTableView(this);

          // let info = App.userInfoManager.getMyInfo();
          // App.hmGameLogicBase.requestLoginRoom(roomInfo.roomID, info.userID, info.userToken);
        }

        onInitRoomInfo(res) {
          // if (!this.isShow && res) {
          //     this.isShow = true;
          //     let datas = res.luckyRewardList;
          //     this.spinList = datas;
          //     datas.sort((a, b) => {
          //         return a.order - b.order;
          //     })
          //     datas.forEach((data, index) => {
          //         data.num /= 100;
          //     })

          //     let fun = () => {
          //         this.showPopAnim(() => {
          //             if (res.pos == -1) {
          //                 this.spinBtn.getComponent(Button).interactable = true;
          //             } else {
          //                 Tween.stopAllByTarget(this.spinBtn);
          //                 Tween.stopAllByTarget(this.wheel);

          //                 this.spinBtn.getComponent(Button).interactable = false;
          //                 this.wheel.angle = -22.5 - (parseInt(res.pos) - 1) * 45;

          //                 App.tips.show("The number of draw attempts has been exhausted.");
          //             }
          //         });
          //     }

          //     let items = this.wheel.children;
          //     let count = items.length;
          //     items.forEach((item, index) => {
          //         let data = datas[index];
          //         let match = data.pic.match(/https?:\/\/[^\s"']+/);
          //         let clean = match ? match[0].replace(/(\.png|\.jpg|\.jpeg|\.gif|\.webp).*/i, "$1") : "";
          //         item.getComponent(Sprite).loadRemoteImage({ url: clean, defaultBundle: Macro.BUNDLE_RESOURCES, view: this });
          //         const label = item.getChildByName("label");
          //         if (data.type == 1) {
          //             label.active = false;
          //         } else {
          //             label.active = true;
          //             label.getComponent(Label).string = `${Number(data.num)}`;
          //         }
          //     });
          //     fun();
          // }
        }
        onSpanResult(res) {
          if (res) {
            let x = res.order;
            this.spinAnim(x);
          }
        }
        onClickSpinBtn(e) {
          // this.tableLogic.requestBet();
          this.spinAnim(~~(Math.random() * 8));
        }
        spinAnim(x) {
          this.spinBtn.getComponent(Button).interactable = false;
          let angle = -360 * 5 + x * 45 + 22.5;
          const lightingBingoOpacity = this.lightingBingo.getComponent(UIOpacity);
          Tween.stopAllByTarget(this.wheel);
          Tween.stopAllByTarget(this.spinBtn);
          Tween.stopAllByTarget(lightingBingoOpacity);
          let wheelAnim = () => {
            return new Promise((resolve, reject) => {
              this.wheel.angle %= -360;
              tween(this.wheel).to(8, {
                angle: angle
              }, {
                easing: 'cubicOut'
              }).call(() => {
                resolve(null);
              }).start();
            });
          };
          let bingoAnim = tween(lightingBingoOpacity).to(0.2, {
            opacity: 0
          }).to(0.2, {
            opacity: 255
          });
          let lightAnim = () => {
            return new Promise((resolve, reject) => {
              tween(lightingBingoOpacity).set({
                opacity: 255
              }).repeat(2, bingoAnim).call(() => {
                resolve(null);
              }).start();
            });
          };
          wheelAnim().then(() => lightAnim()).then(() => {
            this.showReward(x);
            this.spinBtn.getComponent(Button).interactable = true;
          });
        }
        checkSpinTip() {
          // const url = 'https://djapi.szhmkeji.com/api/daily_tasks/spinpoint';
          // let myUID = App.userInfoManager.getMyInfo().userID;
          // let params = {
          // userID: myUID
          // };
          // MyHttpRequest2.post(url, params, (res) => {
          // if (res.status == 0) {
          // let data = res.data;
          // App.redPointManager.LuckySpinRedPoint = data.has;
          // }
          // })
        }
        onClickCloseBtn(e) {
          // App.hmGameLogicBase.exitGame();
          // App.gameManager.reset();
          Tween.stopAllByTarget(this.popBase);
          tween(this.popBase).to(0.2, {
            scale: v3(0, 0, 1)
          }).call(() => {
            this.checkSpinTip();
            this.hide();
          }).start();
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "popBase", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lights", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spinBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wheel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "women", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lightingBingo", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/Hall', 'chunks:///_virtual/Hall'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});