import DS from "ember-data";
import cardColor from "../utils/card-color";


export default DS.Model.extend({
    type: DS.attr('string'),
    isVirtual: function() {
      return this.get('type') === "virtual";
    }.property('type'),
    size: DS.attr('number'),
    path: DS.attr('string'),
    mountpoint: DS.attr('string'),
    mounted: function() {
      return !!this.get('mountpoint');
    }.property('mountpoint'),
    isTooImportant: function() {
      return ["/", "/boot"].indexOf(this.get('mountpoint'))>=0;
    }.property('mountpoint'),
    fstype: DS.attr('string'),
    crypt: DS.attr('boolean'),
    enabled: DS.attr('boolean'),
    passwd: DS.attr('string'),
    operation: DS.attr('string'),
    isReady: DS.attr('boolean', {defaultValue: false}),
    cardColor: function() {
      return cardColor();
    }.property()
});
