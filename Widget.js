// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: grin-squint;
// initialize contacts

var version = "0.1.0";


const contacts_list = [
  {
    name: "Simone",
    type: "telegram",
    telegram_username: "Simone",
    photo: "1.png",
  },
  {
    name: "Gitti Oma",
    type: "telegram",
    telegram_usernameone: "GittiOma",
    photo: "2.png",
  },
  {
    name: "Oma",
    type: "telegram",
    telegram_username: "Oma",
    photo: "3.png",
  },
  {
    name: "Papa",
    type: "telegram",
    telegram_username: "Christian",
    photo: "4.png",
  },
];

const SETTINGS = {
  BG_COLOR: "#151515",
  BG_IMAGE: {
    SHOW_BG: false,
    IMAGE_PATH: "bg.png",
  },
  BG_OVERLAY: {
    SHOW_OVERLAY: false,
    OVERLAY_COLOR: "#111111",
    OPACITY: 0.5,
  },
  PADDING: 8,
  TITLE_FONT_SIZE: 18,
  PHOTO_SIZE: 60,
  NAME_FONT_SIZE: 11,
  RANDOMIZE_CONTACTS: false,
  NO_OF_CONTACTS_TO_SHOW: 4,
};

// check if RANDOMIZE_CONTACTS is enabled. If it's set to `true`, randomize the contacts_list array.
if (SETTINGS.RANDOMIZE_CONTACTS == true) {
  contacts = [...contacts_list]
    .sort(() => 0.5 - Math.random())
    .slice(0, SETTINGS.NO_OF_CONTACTS_TO_SHOW);
} else {
  contacts = [...contacts_list].slice(0, SETTINGS.NO_OF_CONTACTS_TO_SHOW);
}

// A function to download images
async function getImg(image) {
  let folderName = "Conversable";

  let fm = FileManager.iCloud();
  let dir = fm.documentsDirectory();
  let path = fm.joinPath(dir + "/" + folderName, image);
  let download = await fm.downloadFileFromiCloud(path);
  let isDownloaded = await fm.isFileDownloaded(path);

  if (fm.fileExists(path)) {
    return fm.readImage(path);
  } else {
    console.log("Error: File does not exist.");
  }
}

async function CreateAction(contact) {
  let { phone, email, twitter_id, telegram_username } = contact;
  let serviceUrl;
  let icon;

  switch (contact.type) {
    case "sms":
      serviceUrl = `sms://${phone}`;
      icon = "icons/sms.png";
      break;
    case "call":
      serviceUrl = `tel://${phone}`;
      icon = "icons/phone.png";
      break;
    case "mail":
      serviceUrl = `mailto://${email}`;
      icon = "icons/mail.png";
      break;
    case "facetime":
      serviceUrl = `facetime://${phone}`;
      icon = "icons/facetime.png";
      break;
    case "facetime-audio":
      serviceUrl = `facetime-audio://${phone}`;
      icon = "icons/facetime.png";
      break;
    case "whatsapp":
      serviceUrl = `whatsapp://send?text=&phone=${phone}`;
      icon = "icons/whatsapp.png";
      break;
    case "twitter":
      serviceUrl = `twitter://messages/compose?recipient_id=${twitter_id}`;
      icon = "icons/twitter.png";
      break;
    case "telegram":
      serviceUrl = `shortcuts://run-shortcut?name=${telegram_username}`;
      icon = "icons/phone.png";
      break;
  }

  return { serviceUrl, icon };
}

// A function to create contacts (to be displayed in the widget).
async function CreateContact(contact, row) {
  let { PHOTO_SIZE, NAME_FONT_SIZE } = SETTINGS;

  let { photo, name } = contact;
  let { serviceUrl, icon } = await CreateAction(contact);

  let contactStack = row.addStack();
  contactStack.layoutVertically();

  contactStack.url = serviceUrl;

  let photoStack = contactStack.addStack();

  photoStack.addSpacer();

  let img = await getImg(photo);
  let contactPhoto = photoStack.addImage(img);
  contactPhoto.imageSize = new Size(PHOTO_SIZE, PHOTO_SIZE);
  contactPhoto.cornerRadius = PHOTO_SIZE / 2;
  contactPhoto.applyFillingContentMode();

  photoStack.addSpacer();

  contactStack.addSpacer(4);

  let nameStack = contactStack.addStack();

  nameStack.addSpacer();

  let iconPath = await getImg(icon);
  let appIcon = nameStack.addImage(iconPath);
  appIcon.imageSize = new Size(12, 12);

  nameStack.addSpacer(4);

  let contactName = nameStack.addText(name);
  contactName.font = Font.mediumSystemFont(NAME_FONT_SIZE);
  contactName.lineLimit = 1;

  nameStack.addSpacer();
}

async function CreateWidget(contacts) {
  let { BG_COLOR, BG_IMAGE, BG_OVERLAY, PADDING, TITLE_FONT_SIZE } = SETTINGS;

  let w = new ListWidget();
  w.backgroundColor = new Color(BG_COLOR);
  w.setPadding(PADDING, PADDING, PADDING, PADDING);

  // Show background image if SHOW_BG is set to `true`.
  if (BG_IMAGE.SHOW_BG == true) {
    let bg = await getImg(BG_IMAGE.IMAGE_PATH);
    w.backgroundImage = bg;
  }

  // Show overlay if SHOW_OVERLAY is set to `true`. For light background images, it is recommended that you turn overlay on so that the contact names and text remain legible.
  if (BG_OVERLAY.SHOW_OVERLAY == true) {
    let overlayColor = new Color(
      BG_OVERLAY.OVERLAY_COLOR,
      BG_OVERLAY.OPACITY || 0.3
    );
    let gradient = new LinearGradient();
    gradient.colors = [overlayColor, overlayColor];
    gradient.locations = [0, 1];
    w.backgroundGradient = gradient;
  }

  w.addSpacer();

  let containerStack = w.addStack();
  containerStack.layoutVertically();

  let titleStack = containerStack.addStack();

  titleStack.addSpacer();
  
  
  
  
  // weather

const key="71fea5000b078d0272d649fd9d91ffae"
const city="Wiener%20Neustadt"
const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
let req = new Request(url)
let json= await req.loadJSON()
let temp = Math.round(json.main.temp)

const iconURL = "https://openweathermap.org/img/wn/" + json.weather[0].icon + "@2x.png"

//const iconURL = "https://github.com/yuvraaaj/openweathermap-api-icons/raw/master/icons/" + json.weather[0].icon + ".png"





        let iconRequest = new Request(iconURL);
        let icon = await iconRequest.loadImage();
log(json);

  
  
  
  
  let titleweathericon = titleStack.addStack()
  
  let title = titleStack.addText(String(temp) + "°C");
  
  
  titleweathericon.addImage(icon).imageSize = new Size(35,35);
  
  
  titleweathericon.layoutVertically();
  
  titleweathericon.addSpacer(null)

  //let title = titleStack.addText("Start a conversation with");
  //title.font = Font.boldRoundedSystemFont(TITLE_FONT_SIZE);

  
  
 let titlebat = titleStack.addStack()

titlebat.addSpacer(null)
  
  
  // battery

const batteryLine = titlebat.addText('⚡' + renderBattery());
batteryLine.textColor = new Color("#F8F8FF"); batteryLine.font = new Font("Menlo", 14); batteryLine.rightAlignText();
function renderBattery() { 
const batteryLevel = Device.batteryLevel(); 
const juice = "".repeat(Math.floor(batteryLevel * 10)); 
const used = " ".repeat(1 - juice.length) 
const batteryAscii = "|" + juice + used + "" + Math.round(batteryLevel * 100) + "%"; 
return batteryAscii; }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  titleStack.addSpacer();

  containerStack.addSpacer(16);

  let contactRowStack = containerStack.addStack();
  contactRowStack.centerAlignContent();

  contactRowStack.addSpacer();

  contacts.map((contact) => {
    CreateContact(contact, contactRowStack);
  });

  contactRowStack.addSpacer();

  w.addSpacer();

  Script.setWidget(w);

  return w;
}

let w = await CreateWidget(contacts);
//w.presentMedium();
Script.complete();
