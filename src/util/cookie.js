export default class CookieUtil{
    static remove(name = "Authorization") {
      document.cookie = `${name}=; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    }
    static get(name = "Authorization") {
        name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      static set(name = "Authorization", value, horasExpirar) {
        var d = new Date();
        d.setTime(d.getTime() + (horasExpirar  * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
      }
}