const Model = Sequelize.Model

class Item extends Model {}
Item.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: Sequelize.STRING,
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = {
  Item
}