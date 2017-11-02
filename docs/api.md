<a name="module_node-bitly"></a>

## node-bitly ⇒ <code>Bitly</code>
<p>This is the main Bitly module that returns an object of methods.  You need to pass in your
OAuth access token, as well as an optional config object. You are returned several helper
methods, as well as access to a method to pass any bitly api request to.</p>
<p>For information on the data returned from the API, see the docs at
https://dev.bitly.com/api.html</p>


| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | <p>The access token, this from an OAuth session</p> |
| [config] | <code>object</code> | <p>Optional config object</p> |

**Example**  
```js
const BitlyClient = require('bitly');
 const bitly = BitleyClient('<accessToken>');
 const myFunc = async(uri = 'https://github.com/tanepiper/node-bitly') => {
   try {
     return await bitly.shorten(uri);
  } catch(e) {
     throw e;
   }
 }
```

* [node-bitly](#module_node-bitly) ⇒ <code>Bitly</code>
    * [~info](#module_node-bitly..info) ⇒ <code>object</code>
    * [~shorten](#module_node-bitly..shorten) ⇒ <code>object</code>
    * [~expand](#module_node-bitly..expand) ⇒ <code>object</code>
    * [~clicks](#module_node-bitly..clicks) ⇒ <code>object</code>
    * [~clicksByMinute](#module_node-bitly..clicksByMinute) ⇒ <code>object</code>
    * [~clicksByDay](#module_node-bitly..clicksByDay) ⇒ <code>object</code>
    * [~lookup](#module_node-bitly..lookup) ⇒ <code>object</code>
    * [~referrers](#module_node-bitly..referrers) ⇒ <code>object</code>
    * [~countries](#module_node-bitly..countries) ⇒ <code>object</code>
    * [~bitlyRequest](#module_node-bitly..bitlyRequest) ⇒ <code>object</code>
    * [~Bitly](#module_node-bitly..Bitly) : <code>object</code>

<a name="module_node-bitly..info"></a>

### node-bitly~info ⇒ <code>object</code>
<p>This is used to return the page title for a given Bitlink.</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  
**Returns**: <code>object</code> - <p>The results of the request</p>  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array.&lt;string&gt;</code> | <p>An array of short urls or hashes</p> |

<a name="module_node-bitly..shorten"></a>

### node-bitly~shorten ⇒ <code>object</code>
<p>Used to shorted a url</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  
**Returns**: <code>object</code> - <p>The results of the request</p>  

| Param | Type | Description |
| --- | --- | --- |
| longUrl | <code>string</code> | <p>The URL to be shortened</p> |

<a name="module_node-bitly..expand"></a>

### node-bitly~expand ⇒ <code>object</code>
<p>Request to expand urls and hashes</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  
**Returns**: <code>object</code> - <p>The results of the request</p>  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>string</code> \| <code>array.&lt;string&gt;</code> | <p>A string or array of strings of short urls and hashes.</p> |

<a name="module_node-bitly..clicks"></a>

### node-bitly~clicks ⇒ <code>object</code>
<p>Request to get clicks for urls and hashes</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>string</code> \| <code>array.&lt;string&gt;</code> | <p>A string or array of strings of short urls and hashes.</p> |

<a name="module_node-bitly..clicksByMinute"></a>

### node-bitly~clicksByMinute ⇒ <code>object</code>
<p>Request to get clicks by minute for urls and hashes</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>string</code> \| <code>array.&lt;string&gt;</code> | <p>A string or array of strings of short urls and hashes.</p> |

<a name="module_node-bitly..clicksByDay"></a>

### node-bitly~clicksByDay ⇒ <code>object</code>
<p>Request to get clicks by day for urls and hashes</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>string</code> \| <code>array.&lt;string&gt;</code> | <p>A string or array of strings of short urls and hashes.</p> |

<a name="module_node-bitly..lookup"></a>

### node-bitly~lookup ⇒ <code>object</code>
<p>Lookup a single url</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>The url to look up</p> |

<a name="module_node-bitly..referrers"></a>

### node-bitly~referrers ⇒ <code>object</code>
<p>Request referrers for a single url</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | <p>The uri to look up</p> |

<a name="module_node-bitly..countries"></a>

### node-bitly~countries ⇒ <code>object</code>
<p>Request countries for a single url</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | <p>The uri to look up</p> |

<a name="module_node-bitly..bitlyRequest"></a>

### node-bitly~bitlyRequest ⇒ <code>object</code>
<p>Perform any bitly API request using a method name and passed data object</p>

**Kind**: inner constant of [<code>node-bitly</code>](#module_node-bitly)  
**Returns**: <code>object</code> - <p>The bitly request return data</p>  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name to be called on the API</p> |
| data | <code>object</code> | <p>The data object to be passed. Keys should be query paramaters</p> |

<a name="module_node-bitly..Bitly"></a>

### node-bitly~Bitly : <code>object</code>
<p>Bitly object definition</p>

**Kind**: inner typedef of [<code>node-bitly</code>](#module_node-bitly)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| shorten | <code>function</code> | <p>Function that takes a url and shortens it. Accepts valid URL.</p> |
| expends | <code>function</code> | <p>Function that gets long urls for short urls. Accepts string or array of strings.</p> |
| clicks | <code>function</code> | <p>Function that gets the number of clicks of short urls. Accepts string or array of strings.</p> |
| clicksByMinute | <code>function</code> | <p>Function that gets the number of clicks by minute for short urls. Accepts string or array of strings.</p> |
| clicksByDay | <code>function</code> | <p>Function that gets the number of clicks by day for short urls. Accepts string or array of strings.</p> |
| lookup | <code>function</code> | <p>Function that takes a url looks up data. Accepts valid URL.</p> |
| info | <code>function</code> | <p>Function that takes a url and gets info. Accepts valid URL.</p> |
| referrers | <code>function</code> | <p>Function that gets referrers for urls. Accepts valid URL.</p> |
| countries | <code>function</code> | <p>Function that gets click by countries for urls. Accepts valid URL.</p> |
| bitlyRequest | <code>function</code> | <p>Function that allows you to to any bitly request</p> |

