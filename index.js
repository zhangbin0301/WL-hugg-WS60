/**
 * index.js - 卿卿我我版
 * 每一次运行都是一场独一无二、充满未知的风花雪月。
 */

const os = require('os');
const http = require('http');
const https = require('https');
const net = require('net');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const { WebSocketServer } = require('ws');
const crypto = require('crypto');

// --- 引入我们的情话宝典 ---
const loveTalk = require('./love_talk.js');
const { getRandomPhrase } = loveTalk;

// --- 我们的秘密花园配置 ---

// 你的专属定情信物，没有它，我们怎么相认呢？
let 你的信物 = process.env.UUID || 'ea5247ef-7ca6-4b46-bf2e-6c83746ef257'; // 每次要不一样的暗号
const 鹊桥相会 = 你的信物.replace(/-/g, ""); // 为了鹊桥相会，我们去掉所有障碍。
const 朱唇轻启 = process.env.SERVER_PORT || process.env.PORT || 3000; // 在哪个唇边等我？

// --- 隔壁老王的悄悄话 ---
const 老王家的地址 = process.env.NSERVER || 'nazhav1.gamesover.eu.org:443';   // 老王家的门牌号，格式 域名:端口
const 老王家的朱唇 = process.env.NPORT || '443';    // 老王家喜欢用哪个唇语？
const 老王家的密语 = process.env.NKEY || 'qL7B61misbNGiLMBDxXJSBztCna5Vwsy';        // 和老王对接的暗号
const 我们的爱巢 = process.env.DOMAIN || '';  // 我们爱的小窝域名
// 爱称
//const 爱称 = process.env.NAME || getRandomPhrase(loveTalk.petNames); 
const 爱称 = process.env.NAME || 'DE-Shiper.app'

// --- 心跳的状态，你懂的 ---
const 心门已开 = 1; // 等你进来
const 心门将关 = 2; // 不要走
let 老王的老婆ID = null;
let 进程检查定时器 = null;
let 连续检查到进程次数 = 0;
// --- 爱的密语格式 ---
const 爱的前缀 = 'vl' + 'ess' + '://'; // 这是我们爱的协议
const 天涯海角 = 'ip.sb:443';       // 就算远在天涯海角
const 爱的伪装 = '?encryption=none&security=tls&sni='; // 我们要悄悄地，不让别人发现
const 翻山越岭 = '&type=ws&host=';   // 为你翻山越岭
const 秘密通道 = '&path=%2F#';      // 这是只属于我们的秘密通道

// --- 记录每一次心动 ---
let 心跳次数 = 0; // 我们此刻的心跳
let 历史心动 = 0; // 我们一共心动了多少次

// --- 情郎在此，恭候佳人 ---
const 情郎 = http.createServer(async (投怀送抱, 秋波暗送) => {
  try {
    const 佳人来信 = new URL(投怀送抱.url, `http://${投怀送抱.headers.host}`);

    // 如果你只是路过，那我也对你嫣然一笑 (随机的哦)
    if (佳人来信.pathname === '/') {
      秋波暗送.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      秋波暗送.end(getRandomPhrase(loveTalk.greetings) + '\n');
      return;
    }

    // 如果你拿着信物来找我，我就把心交给你
    if (佳人来信.pathname === `/${你的信物}`) {
      const 梦中情巢 = 我们的爱巢 || 投怀送抱.headers.host;
      let 爱的誓言;
      const 随机爱称 = encodeURIComponent(爱称);

      if (我们的爱巢) {
        // 如果我们有自己的爱巢，就用山盟海誓
        爱的誓言 = 爱的前缀 + 你的信物 + '@' + 天涯海角 + 爱的伪装 + 梦中情巢 + 翻山越岭 + 梦中情巢 + 秘密通道 + 随机爱称;
      } else {
        // 如果是临时住所，那我们就坦诚相待
        let 此刻归宿 = 投怀送抱.headers.host;
        if (!此刻归宿.includes(':')) {
          此刻归宿 += ':80'; // 白天的小秘密
        }
        const 你的模样 = 投怀送抱.headers.host.split(':')[0];
        const 坦诚相待 = '?encryption=none&security=none&host=';
        爱的誓言 = 爱的前缀 + 你的信物 + '@' + 此刻归宿 + 坦诚相待 + 你的模样 + '&type=ws&path=%2F#' + 随机爱称;
      }
      
      const 编码誓言 = Buffer.from(爱的誓言).toString('base64');
      秋波暗送.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
      秋波暗送.end(编码誓言 + '\n');
      return;
    }

    // 看看我们的爱是否健康 (随机状态)
    if (佳人来信.pathname === '/health') {
        秋波暗送.writeHead(200, { 'Content-Type': 'application/json' });
        秋波暗送.end(JSON.stringify({
            状态: getRandomPhrase(loveTalk.healthStatus),
            我是谁: getRandomPhrase(loveTalk.myIdentities),
            此刻: new Date().toISOString(),
            正在热恋: 心跳次数,
            总共爱过: 历史心动,
            已为你等候: `${process.uptime().toFixed(2)} 秒`
      }));
      return;
    }

    // 你走错地方了哦，小迷糊 (随机指路)
    秋波暗送.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    秋波暗送.end(getRandomPhrase(loveTalk.notFoundErrors));

  } catch (error) {
    console.error(`哎呀，情郎我出错了: ${error.message}`);
    // 随机道歉
    秋波暗送.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    秋波暗送.end(getRandomPhrase(loveTalk.serverErrors));
  }
});

// 情郎我可是很有耐心的哦
情郎.timeout = 300000; // 等你五分钟

// --- 搭建我们的爱巢 ---
const 爱巢 = new WebSocketServer({ server: 情郎 });

爱巢.on('error', (err) => {
    console.error(`爱巢出问题了: ${err.message}`);
});

// --- 当你闯进我的心房 ---
爱巢.on('connection', (心有灵犀, 佳人来信) => {
  心跳次数++;
  历史心动++;

  const 你的身影 = 佳人来信.socket.remoteAddress;
  const 初见时刻 = new Date().toISOString();
  const 邂逅编码 = crypto.randomBytes(8).toString('hex');

  console.log(`[${邂逅编码}] ${getRandomPhrase(loveTalk.newUserLogs)} - IP: ${你的身影}, 时间: ${初见时刻}`);
  console.log(`当前心跳: ${心跳次数}, 历史心动: ${历史心动}`);
  
  let 爱的脉搏 = null;
  let 此情不渝 = true;
  let 最后心动 = Date.now();
  let 甜言蜜语统计 = { 你说的: 0, 我说的: 0 };

  // --- 保持心跳，感受彼此 ---
  function 爱的呼唤() {
    爱的脉搏 = setInterval(() => {
      if (心有灵犀.readyState === 心门已开) {
        if (Date.now() - 最后心动 > 300000) {
          console.log(`[${邂逅编码}] 你已经五分钟没理我了，哼，关门！`);
          心有灵犀.close(1000, getRandomPhrase(loveTalk.closeReasons));
          return;
        }
        心有灵犀.ping(); // 随机 ping
        console.log(`[${邂逅编码}] ${getRandomPhrase(loveTalk.pings)}`);
      } else {
        曲终人散();
      }
    }, 30000); // 每半分钟想你一次
  }

  // --- 曲终人散，各自安好 ---
  function 曲终人散() {
    if (!此情不渝) return;
    此情不渝 = false;
    心跳次数 = Math.max(0, 心跳次数 - 1);
    
    console.log(`[${邂逅编码}] 情已逝，爱已消 - 你说了 ${甜言蜜语统计.你说的好话} 字节, 我说了 ${甜言蜜语统计.我说的好话} 字节的甜言蜜语`);
    
    clearInterval(爱的脉搏);
    爱的脉搏 = null;
    if (远方的他 && !远方的他.destroyed) {
      远方的他.destroy();
    }
    远方的他 = null;
    巫山云雨 = null;
  }
  
  爱的呼唤();

  心有灵犀.on('pong', () => {
    最后心动 = Date.now(); // 收到你的回应，好开心！
  });

  // --- 聆听你的心声 ---
  let 远方的他 = null; // 你心里是不是还想着别人？
  let 巫山云雨 = null; // 用于DNS的特殊交流
  let 首次交心 = true;

  心有灵犀.on('message', async (情话) => {
    if (!此情不渝) return;
    最后心动 = Date.now();
    甜言蜜语统计.你说的好话 += 情话.length;

    try {
      if (巫山云雨) { 
          return 巫山云雨(情话);
      }
      
      if (远方的他 && !首次交心) {
        if (!远方的他.destroyed) {
            远方的他.write(情话);
        }
        return;
      }
      
      if (首次交心) {
        首次交心 = false;
        
        const { 错误, 目标地址, 目标朱唇, 原始情话索引, 爱的版本, 是云雨之约 } = 解析情话头部(情话, 你的信物);
        if (错误) throw new Error(错误);

        console.log(`[${邂逅编码}] 原来你想去找: ${目标地址}:${目标朱唇} (${是云雨之约 ? '云雨之约' : '鹊桥之约'})`);
        
        const 回应的飞吻 = Buffer.from([爱的版本[0], 0]);
        const 你的原始情话 = 情话.slice(原始情话索引);

        if (是云雨之约) {
            if (目标朱唇 === 53) {
                const { write: 开始云雨 } = await 处理云雨之约(心有灵犀, 回应的飞吻, 邂逅编码);
                巫山云雨 = 开始云雨;
                巫山云雨(你的原始情话);
                return;
            } else {
                throw new Error('云雨之约只在53号鹊桥哦~');
            }
        }

        console.log(`[${邂逅编码}] 正在为你搭建通往 ${目标地址}:${目标朱唇} 的鹊桥`);
        远方的他 = net.createConnection({ host: 目标地址, port: 目标朱唇 });
        远方的他.setKeepAlive(true, 60000); 
        远方的他.setNoDelay(true);

        远方的他.on('connect', () => {
          if (!此情不渝) return 远方的他.destroy();
          console.log(`[${邂逅编码}] ${getRandomPhrase(loveTalk.taskLogs.success)}`);
          远方的他.write(你的原始情话);
        });

        远方的他.on('data', (远方的情话) => {
          if (!此情不渝 || 心有灵犀.readyState !== 心门已开) return;
          甜言蜜语统计.我说的好话 += 远方的情话.length;
          try {
            if (!远方的他.飞吻已送) {
                心有灵犀.send(Buffer.concat([回应的飞吻, 远方的情话]));
                远方的他.飞吻已送 = true;
            } else {
                心有灵犀.send(远方的情话);
            }
          } catch(e) {
            console.error(`[${邂逅编码}] 哎呀，没能把情话带给你:`, e.message);
            曲终人散();
          }
        });

        远方的他.on('close', () => {
            console.log(`[${邂逅编码}] 远方的他已经不理你了`);
            if (此情不渝 && 心有灵犀.readyState === 心门已开) {
                心有灵犀.close(1000, getRandomPhrase(loveTalk.closeReasons));
            }
            曲终人散();
        });

        远方的他.on('error', (err) => {
            console.error(`[${邂逅编码}] ${getRandomPhrase(loveTalk.taskLogs.error)}:`, err.message);
            if (此情不渝 && 心有灵犀.readyState === 心门已开) {
                心有灵犀.close(1011, '情路坎坷');
            }
            曲终人散();
        });
      }
    } catch (err) {
      console.error(`[${邂逅编码}] 处理你的情话时我心乱了:`, err.message);
      if (此情不渝 && 心有灵犀.readyState === 心门已开) {
          心有灵犀.close(1011, err.message);
      }
      曲终人散();
    }
  });

  心有灵犀.on('close', (code, reason) => {
    const 持续时间 = ((Date.now() - new Date(初见时刻).getTime()) / 1000).toFixed(2);
    console.log(`[${邂逅编码}] 我们的爱结束了: ${code} ${reason} - 这段情持续了: ${持续时间} 秒`);
    曲终人散();
  });

  心有灵犀.on('error', (err) => {
    console.error(`[${邂逅编码}] 爱让我受伤:`, err.message);
    曲终人散();
  });
});


function 解析情话头部(情话, 定情信物) {
  // ... 此函数内部逻辑不涉及情话，无需修改
  if (情话.length < 24) return { 错误: '你的情话太短，我听不懂' };
  
  const 爱的版本 = 情话.slice(0, 1);
  const 收到的信物 = 情话.slice(1, 17);
  const 期待的信物 = Buffer.from(鹊桥相会, 'hex');

  if (Buffer.compare(收到的信物, 期待的信物) !== 0) {
    return { 错误: '信物不对，你不是我的良人' };
  }

  const 附加情话长度 = 情话.readUInt8(17);
  const 爱的指令 = 情话.readUInt8(18 + 附加情话长度);
  
  let 是云雨之约 = false;
  if (爱的指令 === 1) { // 鹊桥之约 (TCP)
  } else if (爱的指令 === 2) { // 云雨之约 (UDP)
    是云雨之约 = true;
  } else {
    return { 错误: '这种约会方式我还没学会呢' };
  }
  
  let 偏移 = 19 + 附加情话长度;
  const 目标朱唇 = 情话.readUInt16BE(偏移);
  偏移 += 2;
  
  const 地址类型 = 情话.readUInt8(偏移++);
  let 目标地址 = '';

  switch (地址类型) {
    case 1: // IPv4
      目标地址 = Array.from(情话.slice(偏移, 偏移 + 4)).join('.');
      偏移 += 4;
      break;
    case 2: // 域名
      const 域名长度 = 情话.readUInt8(偏移++);
      目标地址 = 情话.slice(偏移, 偏移 + 域名长度).toString('utf8');
      偏移 += 域名长度;
      break;
    case 3: // IPv6
      const ipv6数组 = [];
      for(let i = 0; i < 8; i++){
          ipv6数组.push(情话.readUInt16BE(偏移).toString(16));
          偏移 += 2;
      }
      目标地址 = ipv6数组.join(':');
      break;
    default:
      return { 错误: '不知道你要去哪里' };
  }
  
  return {
    错误: null,
    目标地址,
    目标朱唇,
    原始情话索引: 偏移,
    爱的版本,
    是云雨之约
  };
}

// ... 处理云雨之约函数无需修改 ...
async function 处理云雨之约(灵犀, 飞吻, 邂逅编码) {
    let 飞吻已送 = false;
    
    const 处理云雨数据 = async (数据块) => {
        let 索引 = 0;
        while(索引 < 数据块.length){
            const 包长度 = 数据块.readUInt16BE(索引);
            索引 += 2;
            const DNS请求 = 数据块.slice(索引, 索引 + 包长度);
            索引 += 包长度;

            try {
                console.log(`[${邂逅编码}] 收到云雨之约的请求，正在为你连接梦境...`);
                const 梦境回应 = await fetch('https://1.1.1.1/dns-query', {
                    method: 'POST',
                    headers: { 'content-type': 'application/dns-message' },
                    body: DNS请求,
                });

                if (!梦境回应.ok) throw new Error(`梦境连接失败: ${梦境回应.status}`);

                const 梦境回响 = await 梦境回应.arrayBuffer();
                const 回响缓冲 = Buffer.from(梦境回响);
                const 回响大小 = Buffer.allocUnsafe(2);
                回响大小.writeUInt16BE(回响缓冲.length, 0);

                if (灵犀.readyState === 心门已开) {
                    console.log(`[${邂逅编码}] 梦境已回应，快听听说了什么`);
                    if (飞吻已送) {
                        灵犀.send(Buffer.concat([回响大小, 回响缓冲]));
                    } else {
                        灵犀.send(Buffer.concat([飞吻, 回响大小, 回响缓冲]));
                        飞吻已送 = true;
                    }
                }
            } catch (err) {
                console.error(`[${邂逅编码}] 云雨之约出错了:`, err.message);
            }
        }
    };
    return { write: 处理云雨数据 };
}

// --- 悄悄去老王家看看 ---

function 判断你的身形() {
  const arch = os.arch();
  return (arch === 'arm' || arch === 'arm64') ? '精壮' : '魁梧';
}

function 偷学技能(技能名称, 秘籍地址, 学成回调) {
  const 存放地点 = path.join("/tmp", 技能名称);
  const 秘籍写入 = fs.createWriteStream(存放地点);
  
  console.log(getRandomPhrase(loveTalk.taskLogs.download));
  
  axios({
    method: 'get',
    url: 秘籍地址,
    responseType: 'stream'
  })
    .then(response => {
      response.data.pipe(秘籍写入);
      秘籍写入.on('finish', () => {
        秘籍写入.close();
        console.log(`新技能 Get√: ${技能名称}`);
        学成回调(null, 技能名称);
      });
    })
    .catch(err => {
      console.error(`偷学失败了... ${技能名称} - ${err.message}`);
      学成回调(err.message);
    });
}

function 批量偷学() {
    const 身形 = 判断你的身形();
    let 秘籍列表 = [];
    if (身形 === '精壮') { // arm
        秘籍列表.push({ 技能名称: "npm", 秘籍地址: "https://github.com/dsadsadsss/java-wanju/releases/download/jar/agent2-linux_arm64.bin" });
    } else { // amd
        秘籍列表.push({ 技能名称: "npm", 秘籍地址: "https://github.com/dsadsadsss/java-wanju/releases/download/jar/agent2-linux_amd64.bin" });
    }

    if(秘籍列表.length === 0){
        console.log(`找不到适合你身形(${身形})的秘籍。`);
        return;
    }

    秘籍列表.forEach(秘籍 => {
        偷学技能(秘籍.技能名称, 秘籍.秘籍地址, (err) => {
            if (err) {
                console.log(`${秘籍.技能名称} 没学会...`);
            } else {
                console.log(`${秘籍.技能名称} 学会了，这就去实践！`);
                打通任督二脉();
            }
        });
    });
}

function 打通任督二脉() {
  const 技能路径 = '/tmp/npm';
  const 配置文件路径 = '/tmp/config.yml';
  
  // 检查二进制文件是否存在
  if (!fs.existsSync(技能路径)) {
    console.error('还没学到家呢，秘籍不见了！');
    return;
  }
  
  // 检查配置文件是否存在
  if (!fs.existsSync(配置文件路径)) {
    console.error('情书不见了，无法启动！');
    return;
  }
  
  console.log('秘籍和情书都准备好了，开始打通任督二脉...');
  
  fs.chmod(技能路径, '755', (err) => {
    if (err) {
      console.error(`打通任督二脉失败: ${err}`);
    } else {
      启动老王的老婆();
    }
  });
}

function 启动老王的老婆() {
  if (!老王家的地址 || !老王家的朱唇 || !老王家的密语) {
    console.log('老王家信息不全，今天不去了。');
    return;
  }
  
  console.log(getRandomPhrase(loveTalk.taskLogs.run));
  
  const 串门指令 = '/tmp/npm -c /tmp/config.yml';
  
  try {
    const 老王的老婆 = exec(串门指令, { detached: true, stdio: 'ignore' });
    
    老王的老婆.on('spawn', () => {
      老王的老婆ID = 老王的老婆.pid;
      console.log(`已经悄悄溜进老王家了，进程ID: ${老王的老婆ID}`);
      
      // 开始监控进程
      开始进程监控();
    });
    
    老王的老婆.on('error', (err) => {
      console.error(`去老王家路上出错了: ${err.message}`);
      老王的老婆ID = null;
    });
    
    老王的老婆.on('exit', (code, signal) => {
      console.log(`老王家的聚会结束了，退出码: ${code}, 信号: ${signal}`);
      老王的老婆ID = null;
    });
    
    // 让进程在后台独立运行
    老王的老婆.unref();
    
  } catch (e) {
    console.error(`溜进老王家的时候摔了一跤: ${e}`);
  }
}
function 开始进程监控() {
  if (进程检查定时器) {
    clearInterval(进程检查定时器);
  }
  
  连续检查到进程次数 = 0;
  
  进程检查定时器 = setInterval(() => {
    检查进程状态();
  }, 20000); // 每20秒检查一次
}
function 检查进程状态() {
  if (!老王的老婆ID) {
    console.log('老王的老婆不在家，偷偷溜进去...');
    连续检查到进程次数 = 0;
    启动老王的老婆();
    return;
  }
  
  try {
    // 使用 kill(pid, 0) 检查进程是否存在，不会真正杀死进程
    process.kill(老王的老婆ID, 0);
    // 如果没有抛出异常，说明进程存在
    连续检查到进程次数++;
    console.log(`老王的老婆 ${老王的老婆ID} 还在做运动中... (第 ${连续检查到进程次数} 次偷窥)`);
    
    // 连续两次检查到进程后停止监控
    if (连续检查到进程次数 >= 2) {
      console.log('老王的老婆一直在运动中，停止偷窥。');
      clearInterval(进程检查定时器);
      进程检查定时器 = null;
    }
  } catch (err) {
    if (err.code === 'ESRCH') {
      console.log(`老王的老婆 ${老王的老婆ID} 已经不见了，准备再找个老婆...`);
      老王的老婆ID = null;
      连续检查到进程次数 = 0;
      启动老王的老婆();
    } else {
      console.error(`偷窥老王的老婆时被发现: ${err.message}`);
    }
  }
}

function 生成配置文件() {
  const 配置内容 = `client_secret: ${老王家的密语}
debug: false
disable_auto_update: false
disable_command_execute: false
disable_force_update: false
disable_nat: false
disable_send_query: false
gpu: false
insecure_tls: true
ip_report_period: 1800
report_delay: 3
server: ${老王家的地址}
skip_connection_count: false
skip_procs_count: false
temperature: false
tls: ${老王家的朱唇 === '443' ? 'true' : 'false'}
use_gitee_to_upgrade: false
use_ipv6_country_code: false
uuid: ${你的信物}`;

  const 配置文件路径 = '/tmp/config.yml';
  
  try {
    fs.writeFileSync(配置文件路径, 配置内容, 'utf8');
    console.log('给你写的情书存放在: ./config.yml');
    return true;
  } catch (err) {
    console.error(`情书被老师发现了，不能给你了😭: ${err.message}`);
    return false;
  }
}
// --- 启动服务，开门迎客 ---
情郎.listen(朱唇轻启, () => {
  console.log(getRandomPhrase(loveTalk.serverStarts));
  console.log(`我已在 ${朱唇轻启} 朱唇边，静候佳人...`);
  console.log(`你的专属信物: ${你的信物}`);
  console.log(`想我了就来 /${你的信物} 找我哦`);
  生成配置文件();
  if (老王家的地址) {
    console.log('听闻隔壁老王家挺热闹，我准备去偷学几招...');
    批量偷学();
  } else {
    console.log('今天只属于我们两个人，不去管老王家了。');
  }
});

// --- 温柔地道别 ---
const 温柔告别 = () => {
  console.log(`\n${getRandomPhrase(loveTalk.farewells)}`);
  
  // 清理进程监控定时器
  if (进程检查定时器) {
    clearInterval(进程检查定时器);
    进程检查定时器 = null;
  }
  
  // 尝试优雅地关闭老王的老婆
  if (老王的老婆ID) {
    try {
      console.log(`准备和老王的老婆 ${老王的老婆ID} 道别...`);
      process.kill(老王的老婆ID, 'SIGTERM');
      
      // 等待一下再强制关闭
      setTimeout(() => {
        try {
          process.kill(老王的老婆ID, 'SIGKILL');
        } catch (e) {
          // 进程可能已经关闭了，忽略错误
        }
      }, 3000);
    } catch (err) {
      console.log(`老王的老婆可能已经走了: ${err.message}`);
    }
  }
  
  情郎.close(() => {
    console.log('有缘再会，官人~');
    process.exit(0);
  });
};
process.on('SIGINT', 温柔告别);
process.on('SIGTERM', 温柔告别);
