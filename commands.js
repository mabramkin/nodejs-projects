var time = require('time');
// Import this module to the main script to use its functions
const adminUsername = 'mabramkin';
const adminPass = 'kill777';

module.exports = {
  
  _isAuthorized: function(username, password) {
    
    if (username !== undefined && username !== null && adminUsername == username) {    
      if (password == adminPass) {
        return "ok";
      } else {
        return "invalid_pass";
      }
    } 
    
    return "access_denied";
  },
  // Clear the database file
  clearDatabase: function(msg, reply, db) {
    //var pass = "";
    var pass = msg.args(1);
    reply.text(pass);
    var authResult = this._isAuthorized(msg.from.username, pass);
    if (authResult == "ok") {      
      db.remove({}, { multi: true }, function (err) {
        if(err) console.log("There's a problem with the database: ", err);
        else console.log("Database successfully cleared.");
      });
      reply.markdown("✅ *База данных успешно очищена!* ✅");
    } else if (authResult == "invalid_pass") {
      reply.markdown("⛔️ _Вы являетесь администратором, однако передан некорректный пароль для очистки БД! (pass="+pass+")_ ⛔️");
    } else {
      reply.markdown("⛔️ _Недостаточно прав для выполнения данной команды. Команда доступна только администраторам бота_ ⛔️");
    }
  },
  addSprint: function(msg, reply) {
    
  },
  unknown: function(msg, reply) {
    reply.markdown("Вы направили неизвестную для меня команду. Попробуйте **/start** или **/help**");
  },
  help: function(msg, reply) {
    this.commandStart(msg, reply);
  },
  start: function(msg, reply) {
    reply.markdown("Добрый день! Вас приветствует бот-помощник РИТ для работы на проекте внедрения AmdocsCRM8.1! Я обучен следующим командам:");
    reply.markdown(
      "/start - Показать данную справку\r\n" +
      "/help - Показать данную справку\r\n" +
      "/time - Показать текущее время\r\n"     
    );
  },
  time: function(msg, reply, next) {
    var options = {
      //era: 'long',
      hour12: false,
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      weekday: 'short',
      //timezone: 'Europe/Moscow',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      //timeZoneName: 'long'
    };
    
    var now = new time.Date();
    now.setTimezone("Europe/Moscow");
    
    //var date = new Date();
    //var formatter = new Intl.DateTimeFormat("ru", options);
    //.toLocaleString("ru", options)
    reply.text("Текущее время: " + now.toLocaleString());
               //formatter.format(date));    
  },  
  info: function(msg, reply, next) {
    var info = "ID: " + msg.from.id + "\n" +
      "Тип: " + msg.from.type + "\n" +
      "Имя: " + msg.from.firstname + "\n" +
      "Фамилия: " + msg.from.lastname + "\n" +
      "Имя пользователя: " + msg.from.username + "\n" +
      "Полное имя: " + msg.from.name + "\n" +
      "Язык: " + msg.from.language + "\n"
    reply.text(info)
  }
}