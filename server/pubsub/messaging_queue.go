package pubsub

import (
	"errors"
	"fmt"
)

type Message struct {
	Topic string
	Value interface{}
}

type Channel struct {
	ch chan Message
}

type messagingQueue struct {
	topics map[string]*Channel
}

func NewMessagingQueue() *messagingQueue {
	return &messagingQueue{topics: map[string]*Channel{}}
}

// MessagingQueue
type MessagingQueue interface {
	Subscribe(topic string, handler func(m *Message)) error
	Publish(message Message) error
}

func (m messagingQueue) Subscribe(topic string, handler func(m *Message)) error {
	if _, exist := m.topics[topic]; exist {
		return errors.New(fmt.Sprintf("Subscription already exists with name: %s", topic))
	}

	m.topics[topic] = &Channel{
		ch: make(chan Message),
	}

	go func() {
		for {
			c := <-m.topics[topic].ch
			handler(&c)
		}
	}()

	return nil
}

func (m messagingQueue) Publish(message Message) error {
	if _, exists := m.topics[message.Topic]; !exists {
		return errors.New(fmt.Sprintf("Topic has already been closed"))
	}

	m.topics[message.Topic].ch <- message

	return nil
}
