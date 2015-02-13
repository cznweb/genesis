Genesis.Service = DS.Model.extend({
    running: DS.attr('boolean'),
    enabled: DS.attr('boolean'),
    state: DS.attr('string'),
    type: DS.attr('string'),
    displayType: function() {
      return this.get('type').capitalize();
    }.property('type'),
    canManage: function() {
      return ["arkos-redis", "genesis", "kraken"].indexOf(this.get('id'))==-1;
    }.property('id'),
    operation: DS.attr('string'),
    cfg: DS.attr(),
    isReady: DS.attr('boolean', {defaultValue: false})
});