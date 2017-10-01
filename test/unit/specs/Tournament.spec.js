import Vue from 'vue'
import Tournament from '@/components/Tournament'

describe('Tournament.vue', () => {
  const Constructor = Vue.extend(Tournament)
  const vm = new Constructor().$mount()

  it('should render the h1 title', () => {
    expect(vm.$el.querySelector('.tournament h1').textContent)
      .to.equal('Tournament')
  })
  it('should render the h2 title', () => {
    expect(vm.$el.querySelector('.tournament h2').textContent)
      .to.equal('Rounds')
  })
  // it('should render paragraph if no rounds', () => {
  //   vm._data.rounds = []
  //   expect(vm.$el.querySelector('.tournament p').textContent)
  //     .to.equal('No rounds')
  // })
})
