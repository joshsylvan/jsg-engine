import { Camera } from './camera';

export function Scene(name, gameObjectsData, uiObjectsData) {
  const _gameObjectsData = gameObjectsData;
  const _uiObjectsData = uiObjectsData;
  let _gameObjects = [], _uiObjects = [];
  let _newGameObjects = [], _newUiObjects = [];
  let _toDelete = new Set(), _toDeleteUi = new Set();

  let _idGameMap = {}, _idUiMap = {};
  let _shouldUpdateObjectMap = false, _shouldUpdateUiMap = false;

  let _camera;

  const _addGameObjectToMap = (obj) => {
    const key = obj.tag;
    if (_idGameMap[key]) {
      _idGameMap[key].push(obj);
    } else {
      _idGameMap[key] = [obj];
    }
  }

  const _addUiObjectToMap = (obj) => {
    const key = obj.tag;
    if (_idUiMap[key]) {
      _idUiMap[key].push(obj);
    } else {
      _idUiMap[key] = [obj];
    }
  }

  const loadScene = () => {
    _gameObjects = _gameObjectsData.map(([obj, props]) => new obj(...props));
    _uiObjects = _uiObjectsData.map(([obj, props]) => new obj(...props));

    _newGameObjects = [];
    _toDelete = new Set();
    _idGameMap = {};
    _shouldUpdateObjectMap = false;

    // this.uiObjects = uiObjects;
    _newUiObjects = [];
    _toDeleteUi = new Set();
    _idUiMap = {};
    _shouldUpdateUiMap = false;

    _gameObjects.forEach(obj => {
      _addGameObjectToMap(obj);
    });
    _gameObjects.sort((a, b) => a.layer - b.layer);

    _uiObjects.forEach(obj => {
      _addUiObjectToMap(obj);
    });
    _uiObjects.sort((a, b) => a.layer - b.layer);
  }

  const init = (canvas, GameManager) => {
    _camera = Camera(0, 0, canvas);
    _gameObjects.forEach(obj => { obj.init(GameManager) });
    _uiObjects.forEach(obj => { obj.init(GameManager) });
  }

  const onDestroy = (GameManager) => {
    _gameObjects.forEach(obj => obj.onDestroy(GameManager));
    _uiObjects.forEach(obj => obj.onDestroy(GameManager));
  }

  const findGameObjectsById = (id) => {
    if (!_idGameMap[id]) return [];
    return _idGameMap[id];
  }

  const findUiObjectsById = (id) => {
    if (!_idUiMap[id]) return [];
    return _idUiMap[id];
  }

  const addGameObject = (gameObject) => {
    _newGameObjects.push(gameObject);
    _shouldUpdateObjectMap = true;
  };

  const addUiObject = (uiObject) => {
    _newUiObjects.push(uiObject);
    _shouldUpdateUiMap = true;
  };

  const removeGameObject = (gameObject) => {
    _toDelete.add(_gameObjects.indexOf(gameObject));
    _shouldUpdateObjectMap = true;
  }

  const removeUiObject = (uiObject) => {
    _toDeleteUi.add(_uiObjects.indexOf(uiObject));
    _shouldUpdateUiMap = true;
  }

  const updateScene = (props) => {
    if (_toDelete.size > 0) {
      _gameObjects = _gameObjects.filter((obj, index) => {
        if (_toDelete.has(index)) {
          obj.onDestroy(props.GameManager);
          return false;
        }
        return true;
      });
      _toDelete.clear();
    }
    if (_newGameObjects.length > 0) {
      _newGameObjects.forEach(obj => {
        obj.init(props.GameManager);
        obj.awake(props);
      });
      _gameObjects = [..._gameObjects, ..._newGameObjects];
      _newGameObjects = [];
    }

    if (_toDeleteUi.size > 0) {
      _uiObjects = _uiObjects.filter((obj, index) => {
        if (_toDeleteUi.has(index)) {
          obj.onDestroy(props.GameManager);
          return false;
        }
        return true;
      });
      _toDeleteUi.clear();
    }
    if (_newUiObjects.length > 0) {
      _newUiObjects.forEach(obj => {
        obj.init(props.GameManager);
        obj.awake(props);
      });
      _uiObjects = [..._uiObjects, ..._newUiObjects];
      _newUiObjects = [];
    }

    if (_shouldUpdateObjectMap) {
      _shouldUpdateObjectMap = false;
      _idGameMap = {};
      _gameObjects.forEach(obj => {
        _addGameObjectToMap(obj);
      });
      _gameObjects.sort((a, b) => a.layer - b.layer);
    }
    if (_shouldUpdateUiMap) {
      _shouldUpdateUiMap = false;
      _idUiMap = {};
      _uiObjects.forEach(obj => {
        _addUiObjectToMap(obj);
      });
      _uiObjects.sort((a, b) => a.layer - b.layer);
    }
  }

  const getGameObjects = () => _gameObjects;

  const getUiObjects = () => _uiObjects;

  const getCamera = () => _camera;

  return {
    init,
    loadScene,
    onDestroy,
    findGameObjectsById,
    findUiObjectsById,
    addGameObject,
    addUiObject,
    removeGameObject,
    removeUiObject,
    updateScene,
    getGameObjects,
    getUiObjects,
    getCamera,
  };
};