import Typography from "@followBack/GenericElements/Typography";
import * as React from "react";
import {useState} from "react";
import AutocompleteTags from "react-native-autocomplete-tags";
import {View} from "react-native";
const suggestions = ['apple', 'orange', 'banana', 'kiwi'];

const Compose: React.FC = ()=>{
  const [tags, setTags] = useState<string[]>([]);

  const labelExtractor = (tag: string) => tag;

  return (
      <>
        <Typography type="mediumRegularBody" color="primary">hello</Typography>
      <AutocompleteTags
          allowCustomTags
          inputProps={{style:{
            borderBottomColor: "#303030",
              borderBottomWidth: 1,
              width: "100%",
              height: 40,
              color: "white"
            }

          }}
          tags={tags}
         // onAddNewTag={console.log}
          parseChars={[","]}
          flatListProps={{}}
          suggestions={suggestions}
          onChangeTags={setTags}
          labelExtractor={labelExtractor}
          renderSuggestion={(suggestion, onPress) => <View style={{width: 400, paddingHorizontal: 16, marginVertical: 6}}><Typography onPress={onPress} color="secondary" textDecoration="underline" type="largeRegularBody">{suggestion}  |  {suggestion}</Typography></View>
          }
          renderTag={(tag, onPress)=> <View style={{paddingHorizontal: 10}}><Typography color="primary" textDecoration="underline" type="mediumRegularBody">{tag}</Typography></View>
          }

          flatListStyle={{backgroundColor: "grey", borderRadius: 15}}
      />
      </>
  );
};
export default Compose;