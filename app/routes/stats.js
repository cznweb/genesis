import Ember from "ember";
import ENV from "../config/environment";
import Pollster from "../objects/pollster";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  getStats: function() {
    Ember.$.getJSON(ENV.APP.krakenHost+'/api/system/stats/all').then(function(j) {
      var cpu = Math.round(j.cpu);
      Ember.$('#cpu .progress-bar').css('width', cpu+'%').attr('aria-valuenow', cpu);
      Ember.$('#cpu .progress-bar').html(cpu+'%');
      Ember.$('#cpu .text-center').remove();
      Ember.$('#memory .progress-bar').css('width', j.ram[2]+'%').attr('aria-valuenow', j.ram[2]);
      Ember.$('#memory .progress-bar').html(j.ram[2]+'%');
      Ember.$('#memory .text-center').html(Math.round(j.ram[0]/1024/1024)+' Mb used of '+Math.round(j.ram[1]/1024/1024)+' Mb available');
      var swap = Math.round(j.swap[1]/j.swap[0] || 0);
      Ember.$('#swap .progress-bar').css('width', swap+'%').attr('aria-valuenow', swap);
      Ember.$('#swap .progress-bar').html(swap+'%');
      Ember.$('#swap .text-center').html(Math.round(j.swap[0]/1024/1024)+' Mb used of '+Math.round(j.swap[1]/1024/1024)+' Mb available');
      Ember.$('#load .text-center').removeClass('text-center').addClass('load-text');
      Ember.$('#load .load-text').html('<span class="text-muted">1 min:</span> '+j.load[0]+'<span class="text-muted">, 5 min:</span> '+j.load[1]+'<span class="text-muted">, 15 min:</span> '+j.load[2]);
      Ember.$('#temp .text-center').html(j.temp || "Unavailable");
      Ember.$('#uptime .text-center').html(j.uptime);
    });
  },
  setupController: function() {
    this.getStats();
    if (Ember.isNone(this.get('pollster'))) {
      var p = Pollster.extend({
        interval: function() {
          return 5000;
        }.property().readOnly()
      });
      this.set('pollster', p.create({
        onPoll: this.getStats
      }));
    }
    this.get('pollster').start();
  },
  deactivate: function() {
    this.get('pollster').stop();
  }
});
